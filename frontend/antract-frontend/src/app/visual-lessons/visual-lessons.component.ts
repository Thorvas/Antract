import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DrawService } from '../drawing/draw.service';
import { Note } from '../services/Note';

@Component({
  selector: 'app-visual-lessons',
  imports: [CommonModule],
  templateUrl: './visual-lessons.component.html',
  styleUrl: './visual-lessons.component.css'
})
export class VisualLessonsComponent implements AfterViewInit {
  @ViewChild('staff', { static: true }) staffDiv!: ElementRef;

  public readonly selectedNote$: Observable<{ note: Note; index: number } | null>;

  constructor(private drawService: DrawService) {
    this.selectedNote$ = this.drawService.selectedNote$;
  }

  ngAfterViewInit(): void {
    this.drawService.init(this.staffDiv);
  }

  public deleteSelected(): void {
    this.drawService.deleteSelectedNote();
  }

  public raiseSelected(): void {
    this.drawService.transposeSelected(1);
  }

  public lowerSelected(): void {
    this.drawService.transposeSelected(-1);
  }

  public clearSelection(): void {
    this.drawService.clearSelection();
  }

  public formatNote(note: Note): string {
    return `${note.getLetter()}${note.getAccidentalSymbol()}${note.getOctave()}`;
  }
}

