import { Handler } from "./Handler";
import { QuizSubmitted } from "@/domain/event/QuizSubmitted";
import { Mailer } from "../interfaces/IMailer";
import { IClientRepository } from "../interfaces/IClientRepository";

export class QuizSubmittedHandler implements Handler {
    constructor(private readonly clientRepository: IClientRepository, private readonly mailer: Mailer) {}

    eventName = "QuizSubmitted";

    async handle(event: QuizSubmitted): Promise<void> {
        /*
            Atualizar o score pessoal do client e remover o repositório de raking
        */
        await this.clientRepository.updateScore(event.clientId, event.grade);

        const message = `Ola ${event.clientName} sua nota do quiz foi ${event.grade}`;
        await this.mailer.send({ from: "company_email@gmail.com", to: event.clientEmail, message });
    }
}
