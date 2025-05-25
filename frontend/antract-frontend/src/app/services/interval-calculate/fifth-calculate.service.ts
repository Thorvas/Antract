import { Injectable } from '@angular/core';
import { TetradCalculateService } from './tetrad-calculate.service';
import { Note } from '../Note';

@Injectable({
  providedIn: 'root'
})
export class FifthCalculateService {
  tetradCalculateService: TetradCalculateService;

  constructor(tetradCalculateService: TetradCalculateService) {
    this.tetradCalculateService = tetradCalculateService;
   }

  public calculateFiveNoteChordWithMajorNinth(note: Note): Note[] {
    let notes: Note[] = this.tetradCalculateService.calculateMajorSeventhChordWithMajorSeventh(note);
    notes.push(note.calculateMajorNinth());

    return notes;
  }

  public calculateFiveNoteChordWithMinorNinth(note: Note): Note[] {
    let notes: Note[] = this.tetradCalculateService.calculateMajorSeventhChordWithMajorSeventh(note);
    notes.push(note.calculateMinorNinth());

    return notes;
  }
}
