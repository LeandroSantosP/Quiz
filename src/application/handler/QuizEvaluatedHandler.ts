import { Mailer } from "../interfaces/IMailer";
import { IHandler } from "../interfaces/IHandler";
import { QuizEvaluated } from "@/domain/event/QuizEvaluated";

export class QuizEvaluatedHandler implements IHandler {
    eventName = "QuizEvaluated";

    constructor(private readonly mailer: Mailer) {}

    async handle(event: QuizEvaluated): Promise<void> {
        const message = `Ola ${event.name}, uma avaliação foi realizada no quiz ${event.quizName} com resultado ${event.note}, a media total ${event.media}`;
        await this.mailer.send({ from: "test@test.com", to: event.client_email, message });
    }
}
