import { randomUUID } from "crypto";
import { Handler } from "./Handler";
import { QuizSubmitted } from "@/domain/event/QuizSubmitted";
import { Ranking } from "@/domain/Ranking";
import { IRankingRepository } from "../interfaces/IRankingRepository";
import { Mailer } from "../interfaces/IMailer";

export class QuizSubmittedHandler implements Handler {
    constructor(private readonly rankingRepository: IRankingRepository, private readonly mailer: Mailer) {}

    eventName = "QuizSubmitted";

    async handle(event: QuizSubmitted): Promise<void> {
        const ranking = new Ranking(randomUUID(), event.clientEmail, event.grade);
        await this.rankingRepository.save(ranking);

        const message = `Ola ${event.clientName} sua nota do quiz foi ${event.grade}`;
        await this.mailer.send({ from: "company_email@gmail.com", to: event.clientEmail, message });
    }
}
