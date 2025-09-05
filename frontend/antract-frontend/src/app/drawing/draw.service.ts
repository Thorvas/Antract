import { ElementRef, Injectable } from '@angular/core';
import { Note } from '../services/Note';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private svg!: SVGSVGElement;
  private notes: { note: Note; index: number }[] = [];

  private readonly width = 500;
  private readonly height = 200;
  private readonly staveLeft = 10;
  private readonly staveTop = 40;
  private readonly lineSpacing = 10;
  private readonly noteSpacing = 40;

  constructor() {}

  public init(elementRef: ElementRef): void {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', `${this.width}`);
    this.svg.setAttribute('height', `${this.height}`);
    elementRef.nativeElement.innerHTML = '';
    elementRef.nativeElement.appendChild(this.svg);
    this.drawStaff();

    this.svg.addEventListener('click', (e) => this.handleSvgClick(e));
  }

  public addNote(note: Note, index: number): void {
    this.notes.push({ note, index });
    this.redraw();
  }

  public drawNotes(notes: Note[]): void {
    this.notes = notes.map((n, i) => ({ note: n, index: i }));
    this.redraw();
  }

  private handleSvgClick(event: MouseEvent): void {
    if (event.target !== this.svg) {
      return; // avoid adding when clicking on notes
    }
    const rect = this.svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const index = Math.round((x - this.staveLeft) / this.noteSpacing);
    const note = this.getNoteFromY(y);
    this.notes.push({ note, index });
    this.redraw();
  }

  private redraw(): void {
    this.svg.innerHTML = '';
    this.drawStaff();

    const notesByIndex = new Map<number, { entry: { note: Note; index: number }; y: number }[]>();
    this.notes.forEach((entry) => {
      const y = this.getYForNote(entry.note);
      const arr = notesByIndex.get(entry.index) || [];
      arr.push({ entry, y });
      notesByIndex.set(entry.index, arr);
    });

    const middleY = this.staveTop + 2 * this.lineSpacing;

    notesByIndex.forEach((entries, idx) => {
      const x = this.staveLeft + idx * this.noteSpacing;
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('cursor', 'pointer');

      entries.forEach(({ entry, y }) => {
        const top = this.staveTop;
        const bottom = this.staveTop + 4 * this.lineSpacing;

        const ledgerCountAbove = Math.max(0, Math.floor((top - y) / this.lineSpacing));
        for (let i = 1; i <= ledgerCountAbove; i++) {
          const ly = top - i * this.lineSpacing;
          const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ledger.setAttribute('x1', String(x - 12));
          ledger.setAttribute('x2', String(x + 12));
          ledger.setAttribute('y1', String(ly));
          ledger.setAttribute('y2', String(ly));
          ledger.setAttribute('stroke', 'black');
          group.appendChild(ledger);
        }

        const ledgerCountBelow = Math.max(0, Math.floor((y - bottom) / this.lineSpacing));
        for (let i = 1; i <= ledgerCountBelow; i++) {
          const ly = bottom + i * this.lineSpacing;
          const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ledger.setAttribute('x1', String(x - 12));
          ledger.setAttribute('x2', String(x + 12));
          ledger.setAttribute('y1', String(ly));
          ledger.setAttribute('y2', String(ly));
          ledger.setAttribute('stroke', 'black');
          group.appendChild(ledger);
        }

        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', String(x));
        ellipse.setAttribute('cy', String(y));
        ellipse.setAttribute('rx', '7');
        ellipse.setAttribute('ry', '5');
        ellipse.setAttribute('fill', 'black');
        ellipse.setAttribute('transform', `rotate(-20 ${x} ${y})`);
        ellipse.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const i = this.notes.indexOf(entry);
          if (i > -1) {
            this.notes.splice(i, 1);
            this.redraw();
          }
        });
        group.appendChild(ellipse);
      });

      const ys = entries.map((e) => e.y);
      const firstY = ys[0];
      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      stem.setAttribute('stroke', 'black');
      stem.setAttribute('stroke-width', '1');
      if (firstY < middleY) {
        stem.setAttribute('x1', String(x - 5));
        stem.setAttribute('y1', String(Math.min(...ys)));
        stem.setAttribute('x2', String(x - 5));
        stem.setAttribute('y2', String(Math.max(...ys) + 35));
      } else {
        stem.setAttribute('x1', String(x + 5));
        stem.setAttribute('y1', String(Math.max(...ys)));
        stem.setAttribute('x2', String(x + 5));
        stem.setAttribute('y2', String(Math.min(...ys) - 35));
      }
      group.appendChild(stem);

      this.svg.appendChild(group);
    });
  }

  private drawStaff(): void {
    for (let i = 0; i < 5; i++) {
      const y = this.staveTop + i * this.lineSpacing;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(this.staveLeft));
      line.setAttribute('x2', String(this.width - this.staveLeft));
      line.setAttribute('y1', String(y));
      line.setAttribute('y2', String(y));
      line.setAttribute('stroke', 'black');
      this.svg.appendChild(line);
    }
  }

  private getYForNote(note: Note): number {
    const stepMap: Record<string, number> = {
      'C': 0,
      'D': 1,
      'E': 2,
      'F': 3,
      'G': 4,
      'A': 5,
      'H': 6
    };
    const stepsFromC4 = stepMap[note.getLetter()] + (note.getOctave() - 4) * 7;
    // bottom line of the staff corresponds to E4 (2 steps above C4)
    return (
      this.staveTop +
      4 * this.lineSpacing -
      (stepsFromC4 - 2) * (this.lineSpacing / 2)
    );
  }

  private getNoteFromY(y: number): Note {
    // adjust by 2 steps so bottom line maps to E4
    const stepsFromC4 =
      Math.round(
        (this.staveTop + 4 * this.lineSpacing - y) /
          (this.lineSpacing / 2)
      ) + 2;
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];
    const letter = letters[((stepsFromC4 % 7) + 7) % 7];
    const octave = 4 + Math.floor(stepsFromC4 / 7);
    return new Note(0, letter, octave);
  }

}

