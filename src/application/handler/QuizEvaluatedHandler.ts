import { IClientRepository } from "../interfaces/IClientRepository";
import { Mailer } from "../interfaces/IMailer";
import { Handler } from "./Handler";
import { QuizEvaluated } from "@/domain/event/QuizEvaluated";

export class QuizEvaluatedHandler implements Handler {
    eventName = "QuizEvaluated";

    constructor(private readonly mailer: Mailer) {}

    async handle(event: QuizEvaluated): Promise<void> {
        const message = `Ola ${event.name}, uma avaliação foi realizada no quiz ${event.quizName} com resultado ${event.note}, a media total ${event.media}`;
        await this.mailer.send({ from: "test@test.com", to: event.client_email, message });
    }
}
