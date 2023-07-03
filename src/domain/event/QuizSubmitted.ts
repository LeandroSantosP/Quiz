import { DomainEvent } from "./DomainEvent";

export class QuizSubmitted implements DomainEvent {
    name = "QuizSubmitted";
    constructor(
        readonly quizId: string,
        readonly clientId: string,
        readonly grade: number,
        readonly clientEmail: string,
        readonly clientName: string
    ) {}
}
