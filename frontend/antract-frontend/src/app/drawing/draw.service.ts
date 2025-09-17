import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../services/Note';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private svg!: SVGSVGElement;
  private notes: { note: Note; index: number }[] = [];
  private selectedEntry: { note: Note; index: number } | null = null;
  private readonly selectedNoteSubject = new BehaviorSubject<{ note: Note; index: number } | null>(null);

  public readonly selectedNote$ = this.selectedNoteSubject.asObservable();

  private readonly width = 500;
  private readonly height = 200;
  private readonly staveLeft = 10;
  private readonly staveTop = 40;
  private readonly lineSpacing = 10;
  private readonly noteSpacing = 40;
  private readonly chordOffsetSpacing = 6;

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
    const entry = { note, index };
    this.notes.push(entry);
    this.setSelectedEntry(entry, false);
    this.redraw();
  }

  public drawNotes(notes: Note[]): void {
    this.notes = notes.map((n, i) => ({ note: n, index: i }));
    this.setSelectedEntry(null, false);
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
    const entry = { note, index };
    this.notes.push(entry);
    this.setSelectedEntry(entry, false);
    this.redraw();
  }

  public clearSelection(): void {
    if (!this.selectedEntry) {
      return;
    }
    this.setSelectedEntry(null);
  }

  public deleteSelectedNote(): void {
    if (!this.selectedEntry) {
      return;
    }
    const idx = this.notes.indexOf(this.selectedEntry);
    if (idx > -1) {
      this.notes.splice(idx, 1);
    }
    this.setSelectedEntry(null, true);
    this.redraw();
  }

  public transposeSelected(delta: number): void {
    if (!this.selectedEntry || delta === 0) {
      return;
    }
    this.selectedEntry.note.transposeSemitone(delta);
    this.selectedNoteSubject.next({
      note: this.selectedEntry.note,
      index: this.selectedEntry.index
    });
    this.redraw();
  }

  private setSelectedEntry(
    entry: { note: Note; index: number } | null,
    skipRedraw = false
  ): void {
    this.selectedEntry = entry;
    this.selectedNoteSubject.next(entry ? { note: entry.note, index: entry.index } : null);
    if (!skipRedraw && this.svg) {
      this.redraw();
    }
  }

  private computeChordOffsets(count: number): number[] {
    if (count <= 1) {
      return [0];
    }
    const offsets: number[] = [];
    for (let i = 0; i < count; i++) {
      const direction = i % 2 === 0 ? -1 : 1;
      offsets.push(direction * this.chordOffsetSpacing);
    }
    return offsets;
  }

  private redraw(): void {
    if (!this.svg) {
      return;
    }
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
      const baseX = this.staveLeft + idx * this.noteSpacing;
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('cursor', 'pointer');

      const sortedEntries = entries.slice().sort((a, b) => b.y - a.y);
      const offsets = this.computeChordOffsets(sortedEntries.length);
      const noteXs: number[] = [];
      const ys: number[] = [];

      sortedEntries.forEach(({ entry, y }, chordIdx) => {
        const offset = offsets[chordIdx] ?? 0;
        const noteX = baseX + offset;
        noteXs.push(noteX);
        ys.push(y);

        const top = this.staveTop;
        const bottom = this.staveTop + 4 * this.lineSpacing;

        const ledgerCountAbove = Math.max(0, Math.floor((top - y) / this.lineSpacing));
        for (let i = 1; i <= ledgerCountAbove; i++) {
          const ly = top - i * this.lineSpacing;
          const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ledger.setAttribute('x1', String(noteX - 12));
          ledger.setAttribute('x2', String(noteX + 12));
          ledger.setAttribute('y1', String(ly));
          ledger.setAttribute('y2', String(ly));
          ledger.setAttribute('stroke', 'black');
          group.appendChild(ledger);
        }

        const ledgerCountBelow = Math.max(0, Math.floor((y - bottom) / this.lineSpacing));
        for (let i = 1; i <= ledgerCountBelow; i++) {
          const ly = bottom + i * this.lineSpacing;
          const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ledger.setAttribute('x1', String(noteX - 12));
          ledger.setAttribute('x2', String(noteX + 12));
          ledger.setAttribute('y1', String(ly));
          ledger.setAttribute('y2', String(ly));
          ledger.setAttribute('stroke', 'black');
          group.appendChild(ledger);
        }

        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', String(noteX));
        ellipse.setAttribute('cy', String(y));
        ellipse.setAttribute('rx', '7');
        ellipse.setAttribute('ry', '5');
        ellipse.setAttribute('fill', 'black');
        ellipse.setAttribute('transform', `rotate(-20 ${noteX} ${y})`);
        if (this.selectedEntry === entry) {
          ellipse.setAttribute('stroke', '#ff5722');
          ellipse.setAttribute('stroke-width', '2');
        } else {
          ellipse.setAttribute('stroke', 'none');
          ellipse.setAttribute('stroke-width', '0');
        }
        ellipse.addEventListener('click', (ev) => {
          ev.stopPropagation();
          this.setSelectedEntry(entry);
        });
        group.appendChild(ellipse);

        const accidentalSymbol = entry.note.getAccidentalSymbol();
        if (accidentalSymbol) {
          const accidental = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          accidental.textContent = accidentalSymbol;
          accidental.setAttribute('x', String(noteX - 14));
          accidental.setAttribute('y', String(y));
          accidental.setAttribute('font-size', '16');
          accidental.setAttribute('font-family', 'serif');
          accidental.setAttribute('dominant-baseline', 'middle');
          accidental.setAttribute('text-anchor', 'middle');
          accidental.addEventListener('click', (ev) => {
            ev.stopPropagation();
            this.setSelectedEntry(entry);
          });
          group.appendChild(accidental);
        }
      });

      if (sortedEntries.length === 1) {
        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        stem.setAttribute('stroke', 'black');
        stem.setAttribute('stroke-width', '1');
        const topY = Math.min(...ys);
        const bottomY = Math.max(...ys);
        if (topY < middleY) {
          const stemX = Math.min(...noteXs) - 5;
          stem.setAttribute('x1', String(stemX));
          stem.setAttribute('x2', String(stemX));
          stem.setAttribute('y1', String(topY));
          stem.setAttribute('y2', String(bottomY + 35));
        } else {
          const stemX = Math.max(...noteXs) + 5;
          stem.setAttribute('x1', String(stemX));
          stem.setAttribute('x2', String(stemX));
          stem.setAttribute('y1', String(bottomY));
          stem.setAttribute('y2', String(topY - 35));
        }
        group.appendChild(stem);
      }

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

