import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawService } from '../drawing/draw.service';

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
  }
}

