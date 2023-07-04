export class Evaluation {
    note: number;
    constructor(readonly quizId: string, readonly client_id: string, note: number) {
        this.note = note;
        if (note < 0 || note > 5) throw new Error("Note must be between 0 and 5");
    }
}
