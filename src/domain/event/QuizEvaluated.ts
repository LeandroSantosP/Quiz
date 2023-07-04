import { DomainEvent } from "./DomainEvent";

export class QuizEvaluated implements DomainEvent {
    name = "QuizEvaluated";

    constructor(
        readonly client_id: string,
        readonly client_name: string,
        readonly client_email: string,
        readonly note: number,
        readonly media: number,
        readonly quizName: string
    ) {}
}
