import { Injectable } from '@angular/core';
import { Note } from '../Note';

@Injectable({
  providedIn: 'root'
})
export class TriadCalculateService {

  constructor() { }

  public calculateMajorTriadRootPosition(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMajorThird());
    notes.push(note.calculateMajorThird().calculateMinorThird());
  
    return notes;
  }

  public calculateMajorTriadFirstInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMinorThird());
    notes.push(note.calculateMinorThird().calculatePerfectFourth());

    return notes;
  }

  public calculateMajorTriadSecondInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculatePerfectFourth());
    notes.push(note.calculatePerfectFourth().calculateMajorThird());

    return notes;
  }

  public calculateMinorTriadRootPosition(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMinorThird());
    notes.push(note.calculateMinorThird().calculateMajorThird());

    return notes;
  }

  public calculateMinorTriadFirstInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMajorThird());
    notes.push(note.calculateMajorThird().calculatePerfectFourth());

    return notes;
  }

  public calculateMinorTriadSecondInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculatePerfectFourth());
    notes.push(note.calculatePerfectFourth().calculateMinorThird());

    return notes;
  }

  public calculateDiminishedTriadRootPosition(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMinorThird());
    notes.push(note.calculateMinorThird().calculateMinorThird());

    return notes;
  }

  public calculateDiminishedTriadFirstInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMinorThird());
    notes.push(note.calculateMinorThird().calculateAugmentedFourth());

    return notes;
  }

  public calculateDiminishedTriadSecondInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateAugmentedFourth());
    notes.push(note.calculateAugmentedFourth().calculateMinorThird());

    return notes;
  }

  public calculateAugmentedTriadRootPosition(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMajorThird());
    notes.push(note.calculateMajorThird().calculateMajorThird());

    return notes;
  }

  public calculateAugmentedTriadFirstInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateMajorThird());
    notes.push(note.calculateMinorSixth());

    return notes;
  }

  public calculateAugmentedTriadSecondInversion(note: Note): Note[] {
    let notes: Note[] = [];

    notes.push(note);
    notes.push(note.calculateDiminishedFourth());
    notes.push(note.calculateDiminishedFourth().calculateMajorThird());

    return notes;
  }
}
