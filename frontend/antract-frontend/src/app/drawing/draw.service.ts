import { ElementRef, Injectable } from '@angular/core';
import { Factory, Stave, StaveNote, StemmableNote, System, Voice } from 'vexflow';
import { Note } from '../services/Note';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  private factory!: Factory;
  private system!: System;
  private stave!: Stave;
  private notes: StemmableNote[] = [];
  private voice!: Voice;
  private readonly DEFAULT_STAVE_WIDTH = 250;
  private readonly POINT_START_X = 53.833;

  constructor() {}

  public init(elementRef: ElementRef) {

    this.factory = new Factory({
      renderer: {
        elementId: elementRef.nativeElement,
        width: 500,
        height: 300
      }
    });
    
    this.system = this.factory.System({
      x: 0,
      y: 0,
      width: this.DEFAULT_STAVE_WIDTH, // Match the renderer width
      spaceBetweenStaves: 5
    });

    this.stave = this.factory.Stave({
      x: 10,
      y: 300,
      width: this.DEFAULT_STAVE_WIDTH // Increased width for more note spacing
    }).addClef('treble');

    

    this.voice = this.factory.Voice({
      time: { numBeats: this.notes.length * 4, beatValue: 4 }
    })

    this.voice.setStrict(false);
  }

  public addNote(note: StaveNote) {
    this.notes.push(note);
    this.redraw();
  }

   public drawNotes(notes: StemmableNote[]) {
    this.notes = notes;
    this.redraw();
   }

  private redraw() {
    
    this.voice.addTickables(this.notes);
    console.log(this.voice.getTickables());

    this.system.addStave({
      stave: this.stave,
      voices: [this.voice]
    });


    this.factory.draw();
  }

  public drawClickPoints(elementRef: ElementRef) {

    const svg: SVGSVGElement | null = elementRef.nativeElement.querySelector('svg');

    const spacing = 0.16323 * this.DEFAULT_STAVE_WIDTH - 14.2109
    console.log(`Spacing between points: ${spacing}`);

    const svgDom = elementRef.nativeElement.querySelector('svg');
    const groups = svgDom.querySelectorAll('g[id^="vf-"]');
    
    // Filtrowanie tylko tych grup, które mają klasę 'vf-stavenote'
    const stavenoteGroups = Array.from(groups)
      .filter((group): group is SVGGElement => group instanceof SVGGElement && group.classList.contains('vf-stavenote'));

    stavenoteGroups.forEach((group: SVGGElement, i: number) => {
      const bbox = group.getBBox();
      console.log(`x: ${bbox.x}, y: ${bbox.y}, width: ${bbox.width}, height: ${bbox.height}`);
      for (let j = 0; j < 8; j++) {
      let yPosition = this.stave.getYForLine(j);
      const xPosition = this.POINT_START_X + (i * spacing);

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      rect.setAttribute('x', xPosition.toString());
      rect.setAttribute('y', yPosition.toString());
      rect.setAttribute('width', '16.867');
      rect.setAttribute('height', '10');
      rect.setAttribute('opacity', '0');
      rect.setAttribute('pointer-events', 'auto');

      rect.addEventListener('click', () => {
        console.log(`Kliknięto punkt #${i} na x=${xPosition}, y=${yPosition}`);
        // tutaj Twoja logika po kliknięciu…
      });
      group.appendChild(rect);
      }
    });
  }
}
