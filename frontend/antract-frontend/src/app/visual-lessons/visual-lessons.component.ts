  import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Factory, GhostNote, Renderer, Stave, StaveNote } from 'vexflow';
import { IntervalCalculateService } from '../services/interval-calculate.service';
import { Note } from '../services/Note';
import { TetradCalculateService } from '../services/interval-calculate/tetrad-calculate.service';
import { FifthCalculateService } from '../services/interval-calculate/fifth-calculate.service';
import { DrawService } from '../drawing/draw.service';


@Component({
  selector: 'app-visual-lessons',
  imports: [],
  templateUrl: './visual-lessons.component.html',
  styleUrl: './visual-lessons.component.css'
})
export class VisualLessonsComponent implements AfterViewInit {
  @ViewChild('staff2', { static: true }) staffDivTwo!: ElementRef;
  @ViewChild('staff', { static: true }) staffDiv!: ElementRef;

  private renderer!: Renderer;
  private stave!: Stave;
  private factories!: Factory[];
  private notes: StaveNote[] = [];
  constructor(private fifthCalculateService: FifthCalculateService, private drawService: DrawService) {
    this.drawService = drawService;
    this.fifthCalculateService = fifthCalculateService;
  }
  ngAfterViewInit(): void {
    this.drawService.init(this.staffDiv);

    let staveNote = new StaveNote({keys: ['c/5'], duration: 'w' });

    this.drawService.drawNotes([
      new StaveNote({keys: ['c/4'], duration: 'w' }),
      new StaveNote({keys: ['d/4'], duration: 'w' }),
      new StaveNote({keys: ['e/4'], duration: 'w' }),
      new StaveNote({keys: ['f/4'], duration: 'w' }),
      new StaveNote({keys: ['g/4'], duration: 'w' }),
      new StaveNote({keys: ['a/4'], duration: 'w' }),
      new StaveNote({keys: ['b/4'], duration: 'w' }),
    ]);

    this.drawService.drawClickPoints(this.staffDiv);
  }

  private initializeStaff() {
  }
}
