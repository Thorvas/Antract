import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Factory, Renderer, Stave, StaveNote } from 'vexflow';
import { IntervalCalculateService } from '../services/interval-calculate.service';
import { Note } from '../services/Note';


@Component({
  selector: 'app-visual-lessons',
  imports: [],
  templateUrl: './visual-lessons.component.html',
  styleUrl: './visual-lessons.component.css'
})
export class VisualLessonsComponent implements OnInit {
  @ViewChild('staff2', { static: true }) staffDivTwo!: ElementRef;
  @ViewChild('staff', { static: true }) staffDiv!: ElementRef;

  private renderer!: Renderer;
  private stave!: Stave;
  private factories!: Factory[];
  private notes: StaveNote[] = [];
  constructor(private intervalCalculateService: IntervalCalculateService) {}
  
  ngOnInit() {
    this.initializeStaff();
  }

  private initializeStaff() {

    const factory = new Factory({
      renderer: {
        elementId: this.staffDiv.nativeElement,
        width: 600,
        height: 150
      }
    });

    // Create a new system (context and stave)
    const system = factory.System();

    // Create a stave starting at x=10, y=40, width=400
    this.stave = factory.Stave({
      x: 10,
      y: 40,
      width: 500
    }).addClef('treble');

      system.addStave({
        stave: this.stave,
        voices: []
      });

      const context = factory.getContext();

// Teraz możesz rysować dodatkowe elementy np. linię taktową:
const staveStartX = this.stave.getNoteStartX();
const staveWidth = this.stave.getWidth();
const topY = this.stave.getYForLine(0);
const bottomY = this.stave.getYForLine(4);

context.beginPath();
context.moveTo(staveStartX + staveWidth / 2, topY);
context.lineTo(staveStartX + staveWidth / 2, bottomY);
context.stroke();

    const notes = [
      factory.StaveNote({keys: ['c/4', 'g/4'], duration: 'w' }),
      factory.StaveNote({keys: ['d/4'], duration: 'w' }),
      factory.StaveNote({keys: ['e/4'], duration: 'w' }),
      factory.StaveNote({keys: ['f/4'], duration: 'w' }),
      factory.StaveNote({keys: ['g/4'], duration: 'w' }),
    ];

    // Create a voice and add notes to it
    const voice = factory.Voice({
      time: { numBeats: notes.length * 4, beatValue: 4 },
    }).addTickables(notes);

    // Add the voice to the stave
    system.addVoices([voice]);

    // Draw everything
    factory.draw();
  }
}
