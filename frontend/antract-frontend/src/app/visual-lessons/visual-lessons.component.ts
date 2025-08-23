import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawService } from '../drawing/draw.service';
import { Note } from '../services/Note';

@Component({
  selector: 'app-visual-lessons',
  templateUrl: './visual-lessons.component.html',
  styleUrl: './visual-lessons.component.css'
})
export class VisualLessonsComponent implements AfterViewInit {
  @ViewChild('staff', { static: true }) staffDiv!: ElementRef;

  constructor(private drawService: DrawService) {}

  ngAfterViewInit(): void {
    this.drawService.init(this.staffDiv);
    this.drawService.drawNotes([
      new Note(0, 'C', 4),
      new Note(0, 'D', 4),
      new Note(0, 'E', 4),
      new Note(0, 'F', 4),
      new Note(0, 'G', 4),
      new Note(0, 'A', 4),
      new Note(0, 'H', 4)
    ]);
  }
}

