export class Note {

    constructor(pitch: number, letter: string, octave: number = 0) {
        this.octave = octave;
        this.pitch = pitch;
        this.letter = letter;
    }

    private pitch: number;
    private letter: string;
    private octave: number;

    private static readonly letterSemitones: { [key: string]: number } = {
        'C': 0,
        'D': 2,
        'E': 4,
        'F': 5,
        'G': 7,
        'A': 9,
        'H': 11
    }

    public getSemitone(letter: string): number {
        return Note.letterSemitones[letter];
    }

    public getPitch(): number {
        return this.pitch;
    }

    public setPitch(newOctave: number): void {
        this.pitch = newOctave;
    }

    public getLetter(): string {
        return this.letter;
    }

    public setLetter(newNote: string): void {
        this.letter = newNote;
    }

    public getOctave(): number {
        return this.octave;
    }

    public setOctave(newOctave: number): void {
        this.octave = newOctave;
    }

    public addInterval(semitoneDistance: number, noteNumber: number) {

      let notes: string[] = ['C', "D", "E", "F", "G", "A", "H"];

      const targetNote: string = notes[(notes.indexOf(this.getLetter()) + (noteNumber - Math.sign(noteNumber)) + notes.length) % notes.length];
      let targetOctave: number = this.getOctave();

      let startNoteSemitone: number = this.getSemitone(this.getLetter()) + this.getPitch();
      let targetNoteSemitone: number = this.getSemitone(targetNote);

      if (startNoteSemitone > targetNoteSemitone && semitoneDistance > 0) {
            targetOctave += 1;
            targetNoteSemitone += 12;
      } else if (startNoteSemitone < targetNoteSemitone && semitoneDistance < 0) {
            targetOctave -= 1;
            targetNoteSemitone -= 12;
      }

      const naturalSemitoneOffset: number = (targetNoteSemitone - startNoteSemitone);
      const difference: number = semitoneDistance - naturalSemitoneOffset;

      return new Note(difference, targetNote, targetOctave);
  }

    toString(): string {
    const letterName = this.letter // zamiana na np. 'C','D'...,'H'
    const acc = this.pitch;
    if (acc === 0) {
      return letterName + `Octave: ${this.octave}`;
    } else if (acc > 0) {
      // np. +2 -> 'isis'
      return letterName + 'is'.repeat(acc) + `Octave: ${this.octave}`;
    } else { // acc < 0
      const flats = -acc;
      if (flats === 1) {
        if (letterName === 'A' || letterName === 'E') return letterName + 's' + `Octave: ${this.octave}`;
        if (letterName === 'H') return 'B' + `Octave: ${this.octave}`;  // H + bemol -> B (lub 'Hes')
        return letterName + 'es' + `Octave: ${this.octave}`;
      } else {
        // 2 lub więcej bemoli
        let suffix = '';
        if (letterName === 'A' || letterName === 'E') {
          suffix = 's' + 'es'.repeat(flats - 1);    // Ases, Eses, Aseses (teoretycznie)
        } else if (letterName === 'H') {
          suffix = 'es'.repeat(flats);             // Hes, Heses
        } else {
          suffix = 'es'.repeat(flats);             // Ces, Ceses, itd.
        }
        return letterName + suffix + `Octave: ${this.octave}`;
      }
    }
}

public calculateUnison(start: Note): Note {
      return this.addInterval(0, 1);
  }

  public calculateMinorSecond(start: Note): Note {
      return this.addInterval(1, 2);
  }

  public calculateMajorSecond(start: Note): Note {
      return this.addInterval(2, 2);
  }

  public calculateMinorThird(start: Note): Note {
      return this.addInterval(3, 3);
  }

  public calculateMajorThird(start: Note): Note {
      return this.addInterval(4, 3);
  }

  public calculateperfectFourth(start: Note): Note {
      return this.addInterval(5, 4);
  }

  public calculateAugmentedFourth(start: Note): Note {
      return this.addInterval(6, 4);
  }

  public calculateDiminishedFifth(start: Note): Note {
      return this.addInterval(6, 5);
  }

  public calculatePerfectFifth(start: Note): Note {
      return this.addInterval(7, 5);
  }

  public calculateMinorSixth(start: Note): Note {
      return this.addInterval(8, 6);
  }

  public calculateMajorSixth(start: Note): Note {
      return this.addInterval(9, 6);
  }

  public calculateMinorSeventh(start: Note): Note {
      return this.addInterval(10, 7);
  }

  public calculateMajorSeventh(start: Note): Note {
      return this.addInterval(11, 7);
  }

  public calculatePerfectOctave(start: Note): Note {
      return this.addInterval(12, 8);
  }

  public calculateMinorNinth(start: Note): Note {
      return this.addInterval(13, 9);
  }

  public calculateMajorNinth(start: Note): Note {
      return this.addInterval(14, 9);
  }

  public calculateMinorTenth(start: Note): Note {
      return this.addInterval(15, 10);
  }

  public calculateMajorTenth(start: Note): Note {
      return this.addInterval(16, 10);
  }

  public calculatePerfectEleventh(start: Note): Note {
      return this.addInterval(17, 11);
  }

  public calculateAugmentedEleventh(start: Note): Note {
      return this.addInterval(18, 11);
  }

  public calculateDiminishedTwelfth(start: Note): Note {
      return this.addInterval(18, 12);
  }

  public calculatePerfectTwelfth(start: Note): Note {
      return this.addInterval(19, 12);
  }

  public calculateMinorThirteenth(start: Note): Note {
      return this.addInterval(20, 13);
  }

  public calculateMajorThirteenth(start: Note): Note {
      return this.addInterval(21, 13);
  }

  public calculateMinorFourteenth(start: Note): Note {
      return this.addInterval(22, 14);
  }

  public calculateMajorFourteenth(start: Note): Note {
      return this.addInterval(23, 14);
  }

  public calculatePerfectFifteenth(start: Note): Note {
      return this.addInterval(24, 15);
  }

  public calculateKwintaDown(start: Note): Note {
      return this.addInterval(-7, -5);
  }
}