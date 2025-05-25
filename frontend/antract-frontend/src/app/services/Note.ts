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

        const targetNote: string = notes[((notes.indexOf(this.getLetter()) + (noteNumber - Math.sign(noteNumber)) % notes.length + notes.length) % notes.length)];
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
        const letterName = this.letter
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
