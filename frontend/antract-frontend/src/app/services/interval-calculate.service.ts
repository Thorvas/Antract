import { Injectable } from '@angular/core';
import { Note } from './Note';

@Injectable({
  providedIn: 'root'
})
export class IntervalCalculateService {

  constructor() { }


  private addInterval(start: Note, semitoneDistance: number, noteNumber: number) {

      const notes: string[] = ['C', "D", "E", "F", "G", "A", "H"];
      const targetSemitone: number = (start.getSemitone(start.getLetter()) + start.getPitch() + semitoneDistance) % 12;
      const targetNote: string = notes[(notes.indexOf(start.getLetter()) + noteNumber - 1) % notes.length];

      return new Note(targetSemitone - start.getSemitone(targetNote), targetNote);
  }

  public calculateUnison(start:Note): Note {
      return this.addInterval(start, 0, 1);
  }

  public calculateMinorSecond(start: Note): Note {
      return this.addInterval(start, 1, 2);
  }

  public calculateMajorSecond(start: Note): Note {
      return this.addInterval(start, 2, 2);
  }

  public calculateMinorThird(start: Note): Note {
      return this.addInterval(start, 3, 3);
  }

  public calculateMajorThird(start: Note): Note {
      return this.addInterval(start, 4, 3);
  }

  public calculateperfectFourth(start: Note): Note {
      return this.addInterval(start, 5, 4);
  }

  public calculateAugmentedFourth(start: Note): Note {
      return this.addInterval(start, 6, 4);
  }

  public calculateDiminishedFifth(start: Note): Note {
      return this.addInterval(start, 6, 5);
  }

  public calculatePerfectFifth(start: Note): Note {
      return this.addInterval(start, 7, 5);
  }

  public calculateMinorSixth(start: Note): Note {
      return this.addInterval(start, 8, 6);
  }

  public calculateMajorSixth(start: Note): Note {
      return this.addInterval(start, 9, 6);
  }

  public calculateMinorSeventh(start: Note): Note {
      return this.addInterval(start, 10, 7);
  }

  public calculateMajorSeventh(start: Note): Note {
      return this.addInterval(start, 11, 7);
  }

  public calculatePerfectOctave(start: Note): Note {
      return this.addInterval(start, 12, 8);
  }

  public calculateMinorNinth(start: Note): Note {
      return this.addInterval(start, 13, 9);
  }

  public calculateMajorNinth(start: Note): Note {
      return this.addInterval(start, 14, 9);
  }

  public calculateMinorTenth(start: Note): Note {
      return this.addInterval(start, 15, 10);
  }

  public calculateMajorTenth(start: Note): Note {
      return this.addInterval(start, 16, 10);
  }

  public calculatePerfectEleventh(start: Note): Note {
      return this.addInterval(start, 17, 11);
  }

  public calculateAugmentedEleventh(start: Note): Note {
      return this.addInterval(start, 18, 11);
  }

  public calculateDiminishedTwelfth(start: Note): Note {
      return this.addInterval(start, 18, 12);
  }

  public calculatePerfectTwelfth(start: Note): Note {
      return this.addInterval(start, 19, 12);
  }

  public calculateMinorThirteenth(start: Note): Note {
      return this.addInterval(start, 20, 13);
  }

  public calculateMajorThirteenth(start: Note): Note {
      return this.addInterval(start, 21, 13);
  }

  public calculateMinorFourteenth(start: Note): Note {
      return this.addInterval(start, 22, 14);
  }

  public calculateMajorFourteenth(start: Note): Note {
      return this.addInterval(start, 23, 14);
  }

  public calculatePerfectFifteenth(start: Note): Note {
      return this.addInterval(start, 24, 15);
  }

}
