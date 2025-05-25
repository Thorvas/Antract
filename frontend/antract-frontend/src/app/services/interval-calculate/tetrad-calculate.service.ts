import { Injectable } from '@angular/core';
import { Note } from '../Note';
import { TriadCalculateService } from './triad-calculate.service';

@Injectable({
  providedIn: 'root'
})
export class TetradCalculateService {
  triadCalculateService: TriadCalculateService;

  constructor(triadCalculateService: TriadCalculateService) {
    this.triadCalculateService = triadCalculateService;
   }

  public calculateMajorSeventhChordWithMajorSeventh(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMajorTriadRootPosition(note);
    notes.push(note.calculateMajorSeventh());

    return notes;
  }

  public calculateMajorSeventhChordWithMinorSeventh(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMajorTriadRootPosition(note);
    notes.push(note.calculateMinorSeventh());

    return notes;
  }

  public calculateMajorSeventhChordWithMajorSixth(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMajorTriadRootPosition(note);
    notes.push(note.calculateMajorSixth());

    return notes;
  }

  public calculateMajorSeventhChordWithMinorSixth(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMajorTriadRootPosition(note);
    notes.push(note.calculateMinorSixth());

    return notes;
  }

  public calculateMinorSeventhChordWithMajorSeventh(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMinorTriadRootPosition(note);
    notes.push(note.calculateMajorSeventh());

    return notes;
  }

  public calculateMinorSeventhChordWithMinorSeventh(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMinorTriadRootPosition(note);
    notes.push(note.calculateMinorSeventh());

    return notes;
  }

  public calculateMinorSeventhChordWithMajorSixth(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMinorTriadRootPosition(note);
    notes.push(note.calculateMajorSixth());

    return notes;
  }

  public calculateMinorSeventhChordWithMinorSixth(note: Note): Note[] {
    let notes: Note[] = this.triadCalculateService.calculateMinorTriadRootPosition(note);
    notes.push(note.calculateMinorSixth());

    return notes;
  }
}
