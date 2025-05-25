import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Factory, Renderer, Stave, StaveNote } from 'vexflow';
import { IntervalCalculateService } from '../services/interval-calculate.service';
import { Note } from '../services/Note';
import { TetradCalculateService } from '../services/interval-calculate/tetrad-calculate.service';
import { FifthCalculateService } from '../services/interval-calculate/fifth-calculate.service';


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
  constructor(private fifthCalculateService: FifthCalculateService) {
    this.fifthCalculateService = fifthCalculateService;
  }
  
  ngOnInit() {
    this.initializeStaff();
  }

  private initializeStaff() {

    const factory = new Factory({
      renderer: {
        elementId: this.staffDiv.nativeElement,
        width: 500, // Increased width for more space
        height: 150
      }
    });

    // Create a new system (context and stave)
    const system = factory.System({
      x: 0,
      y: 0,
      width: 250, // Match the renderer width
      spaceBetweenStaves: 5
    });

    // Create a stave starting at x=10, y=40, width=800 (wider for more space)
    this.stave = factory.Stave({
      x: 10,
      y: 40,
      width: 250 // Increased width for more note spacing
    }).addClef('treble');

    system.addStave({
      stave: this.stave,
      voices: []
    });

    const notes = [
      factory.StaveNote({keys: ['c/4'], duration: 'w' }),
      factory.StaveNote({keys: ['d/4'], duration: 'w' }),
      factory.StaveNote({keys: ['e/4'], duration: 'w' }),
      factory.StaveNote({keys: ['f/4'], duration: 'w' }),
      factory.StaveNote({keys: ['g/4'], duration: 'w' }),
      factory.StaveNote({keys: ['a/4'], duration: 'w' }),
      factory.StaveNote({keys: ['b/4'], duration: 'w' }),
    ];

    // Create a voice and add notes to it
    const voice = factory.Voice({
      time: { numBeats: notes.length * 4, beatValue: 4 }
      // Removed 'strict: false' as it is not a valid property
    }).addTickables(notes);

    // Add the voice to the stave
    system.addVoices([voice]);

    // Draw everything
    factory.draw();
  }
}
