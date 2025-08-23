import { ElementRef, Injectable } from '@angular/core';
import { Note } from '../services/Note';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private svg!: SVGSVGElement;
  private notes: Note[] = [];

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
  }

  public addNote(note: Note): void {
    this.notes.push(note);
    this.redraw();
  }

  public drawNotes(notes: Note[]): void {
    this.notes = notes;
    this.redraw();
  }

  private redraw(): void {
    this.svg.innerHTML = '';
    this.drawStaff();
    const middleY = this.staveTop + 2 * this.lineSpacing;

    this.notes.forEach((note, index) => {
      const x = this.staveLeft + index * this.noteSpacing + 20;
      const y = this.getYForNote(note);

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('cursor', 'pointer');

      const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      ellipse.setAttribute('cx', String(x));
      ellipse.setAttribute('cy', String(y));
      ellipse.setAttribute('rx', '7');
      ellipse.setAttribute('ry', '5');
      ellipse.setAttribute('fill', 'black');
      ellipse.setAttribute('transform', `rotate(-20 ${x} ${y})`);
      group.appendChild(ellipse);

      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      stem.setAttribute('stroke', 'black');
      stem.setAttribute('stroke-width', '1');
      if (y < middleY) {
        // stem downwards on left side
        stem.setAttribute('x1', String(x - 5));
        stem.setAttribute('y1', String(y));
        stem.setAttribute('x2', String(x - 5));
        stem.setAttribute('y2', String(y + 35));
      } else {
        // stem upwards on right side
        stem.setAttribute('x1', String(x + 5));
        stem.setAttribute('y1', String(y));
        stem.setAttribute('x2', String(x + 5));
        stem.setAttribute('y2', String(y - 35));
      }
      group.appendChild(stem);

      group.addEventListener('click', () => {
        const current = ellipse.getAttribute('fill');
        ellipse.setAttribute('fill', current === 'black' ? 'red' : 'black');
        console.log(`Clicked ${note.getLetter()}${note.getOctave()}`);
      });

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
    return this.staveTop + 4 * this.lineSpacing - stepsFromC4 * (this.lineSpacing / 2);
  }

}

