import { IHandler } from "../interfaces/IHandler";
import { QuizSubmitted } from "@/domain/event/QuizSubmitted";
import { Mailer } from "../interfaces/IMailer";
import { IClientRepository } from "../interfaces/IClientRepository";
import { ECDH } from "crypto";

export class QuizSubmittedHandler implements IHandler {
    constructor(private readonly clientRepository: IClientRepository, private readonly mailer: Mailer) {}

    eventName = "QuizSubmitted";

    async handle(event: QuizSubmitted): Promise<void> {
        const client = await this.clientRepository.getById(event.clientId);

        client.updatedMaxScore(event.grade);

        await this.clientRepository.updateScore(event.clientId, event.grade);

        const message = `Ola ${event.clientName} sua nota do quiz foi ${event.grade}`;
        await this.mailer.send({ from: "company_email@gmail.com", to: event.clientEmail, message });
    }
}
