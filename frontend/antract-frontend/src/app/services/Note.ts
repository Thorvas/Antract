export class Note {
  private pitch: number;
  private letter: string;
  private octave: number;

  private static readonly letterSemitones: { [key: string]: number } = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    H: 11
  };

  private static readonly letterOrder: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];

  constructor(pitch: number, letter: string, octave: number = 0) {
    this.octave = octave;
    this.pitch = pitch;
    this.letter = letter;
  }

  private static resolveOctaveAndPitch(totalSemitone: number, letter: string): {
    octave: number;
    pitch: number;
  } {
    const base = Note.letterSemitones[letter];
    let octave = Math.round((totalSemitone - base) / 12);
    let pitch = totalSemitone - (octave * 12 + base);

    while (pitch > 1) {
      octave += 1;
      pitch = totalSemitone - (octave * 12 + base);
    }

    while (pitch < -1) {
      octave -= 1;
      pitch = totalSemitone - (octave * 12 + base);
    }

    return { octave, pitch };
  }

  private getTotalSemitone(): number {
    return this.octave * 12 + Note.letterSemitones[this.letter] + this.pitch;
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

  public transposeSemitone(distance: number): void {
    if (distance === 0) {
      return;
    }

    if (distance > 0) {
      for (let i = 0; i < distance; i++) {
        this.raiseOneSemitone();
      }
    } else {
      for (let i = 0; i < Math.abs(distance); i++) {
        this.lowerOneSemitone();
      }
    }
  }

  private raiseOneSemitone(): void {
    const total = this.getTotalSemitone() + 1;

    if (this.pitch < 1) {
      this.pitch += 1;
      return;
    }

    const currentIndex = Note.letterOrder.indexOf(this.letter);
    const nextIndex = (currentIndex + 1) % Note.letterOrder.length;
    const nextLetter = Note.letterOrder[nextIndex];
    const { octave, pitch } = Note.resolveOctaveAndPitch(total, nextLetter);

    this.letter = nextLetter;
    this.octave = octave;
    this.pitch = pitch;
  }

  private lowerOneSemitone(): void {
    const total = this.getTotalSemitone() - 1;

    if (this.pitch > -1) {
      this.pitch -= 1;
      return;
    }

    const currentIndex = Note.letterOrder.indexOf(this.letter);
    const prevIndex = (currentIndex - 1 + Note.letterOrder.length) % Note.letterOrder.length;
    const prevLetter = Note.letterOrder[prevIndex];
    const { octave, pitch } = Note.resolveOctaveAndPitch(total, prevLetter);

    this.letter = prevLetter;
    this.octave = octave;
    this.pitch = pitch;
  }

  public getAccidentalSymbol(): string {
    if (this.pitch === 0) {
      return '';
    }

    if (this.pitch > 0) {
      return '♯'.repeat(this.pitch);
    }

    return '♭'.repeat(Math.abs(this.pitch));
  }

  public addInterval(semitoneDistance: number, noteNumber: number) {

    let notes: string[] = ['C', "D", "E", "F", "G", "A", "H"];

    const targetNote: string = notes[((notes.indexOf(this.getLetter()) + (noteNumber - Math.sign(noteNumber)) % notes.length
 + notes.length) % notes.length)];
    console.log(`Target note: ${(notes.indexOf(this.getLetter()) + (noteNumber - Math.sign(noteNumber)) + notes.length) % notes.length}`);
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

    if (semitoneDistance >= 12 || semitoneDistance <= -12) {
      if (semitoneDistance >= 12) {
        targetOctave += Math.floor(semitoneDistance / 12);
      } else if (semitoneDistance <= -12) {
        targetOctave += Math.ceil(semitoneDistance / 12);
      }
      semitoneDistance = semitoneDistance % 12;
    }

    const naturalSemitoneOffset: number = (targetNoteSemitone - startNoteSemitone);
    const difference: number = semitoneDistance - naturalSemitoneOffset;

    return new Note(difference, targetNote, targetOctave);
  }

  toString(): string {
    const letterName = this.letter;
    const acc = this.pitch;
    if (acc === 0) {
      return letterName + `Octave: ${this.octave}`;
    } else if (acc > 0) {
      return letterName + 'is'.repeat(acc) + `Octave: ${this.octave}`;
    } else {
      const flats = -acc;
      if (flats === 1) {
        if (letterName === 'A' || letterName === 'E') return letterName + 's' + `Octave: ${this.octave}`;
        if (letterName === 'H') return 'B' + `Octave: ${this.octave}`;
        return letterName + 'es' + `Octave: ${this.octave}`;
      } else {
        let suffix = '';
        if (letterName === 'A' || letterName === 'E') {
          suffix = 's' + 'es'.repeat(flats - 1);
        } else if (letterName === 'H') {
          suffix = 'es'.repeat(flats);
        } else {
          suffix = 'es'.repeat(flats);
        }
        return letterName + suffix + `Octave: ${this.octave}`;
      }
    }
  }

  public calculateUnison(): Note {
    return this.addInterval(0, 1);
  }

  public calculateMinorSecond(): Note {
    return this.addInterval(1, 2);
  }

  public calculateMajorSecond(): Note {
    return this.addInterval(2, 2);
  }

  public calculateMinorThird(): Note {
    return this.addInterval(3, 3);
  }

  public calculateMajorThird(): Note {
    return this.addInterval(4, 3);
  }

  public calculatePerfectFourth(): Note {
    return this.addInterval(5, 4);
  }

  public calculateAugmentedFourth(): Note {
    return this.addInterval(6, 4);
  }

  public calculateDiminishedFourth(): Note {
    return this.addInterval(4, 4);
  }

  public calculateDiminishedFifth(): Note {
    return this.addInterval(6, 5);
  }

  public calculatePerfectFifth(): Note {
    return this.addInterval(7, 5);
  }

  public calculateMinorSixth(): Note {
    return this.addInterval(8, 6);
  }

  public calculateMajorSixth(): Note {
    return this.addInterval(9, 6);
  }

  public calculateMinorSeventh(): Note {
    return this.addInterval(10, 7);
  }

  public calculateMajorSeventh(): Note {
    return this.addInterval(11, 7);
  }

  public calculatePerfectOctave(): Note {
    return this.addInterval(12, 8);
  }

  public calculateMinorNinth(): Note {
    return this.addInterval(13, 9);
  }

  public calculateMajorNinth(): Note {
    return this.addInterval(14, 9);
  }

  public calculateMinorTenth(): Note {
    return this.addInterval(15, 10);
  }

  public calculateMajorTenth(): Note {
    return this.addInterval(16, 10);
  }

  public calculatePerfectEleventh(): Note {
    return this.addInterval(17, 11);
  }

  public calculateAugmentedEleventh(): Note {
    return this.addInterval(18, 11);
  }

  public calculateDiminishedTwelfth(): Note {
    return this.addInterval(18, 12);
  }

  public calculatePerfectTwelfth(): Note {
    return this.addInterval(19, 12);
  }

  public calculateMinorThirteenth(): Note {
    return this.addInterval(20, 13);
  }

  public calculateMajorThirteenth(): Note {
    return this.addInterval(21, 13);
  }

  public calculateMinorFourteenth(): Note {
    return this.addInterval(22, 14);
  }

  public calculateMajorFourteenth(): Note {
    return this.addInterval(23, 14);
  }

  public calculatePerfectFifteenth(): Note {
    return this.addInterval(24, 15);
  }

  public calculateKwintaDown(): Note {
    return this.addInterval(-7, -5);
  }
}
