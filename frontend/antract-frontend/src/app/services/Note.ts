export class Note {

    constructor(pitch: number, letter: string) {
        this.pitch = pitch;
        this.letter = letter;
    }

    private pitch: number;
    private letter: string;

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

    public getSuffix(): string {
        if (this.pitch > 0) {
            return 'is';
        } else if (this.pitch < 0) {
            return 'es';
        } else {
            return '';
        }
    }

    toString(): string {
        return `${this.letter}${this.getSuffix()}`;
    }
}