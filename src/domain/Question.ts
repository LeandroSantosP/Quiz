export class Question {
    constructor(
        readonly questionName: string,
        readonly answers: { [key: string]: string },
        readonly correctAnswer: number
    ) {}
}
