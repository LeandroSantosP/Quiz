import { IMediator } from "@/infra/mediator/IMediator";
import { IClientRepository } from "./IClientRepository";
import { IQuizRepository } from "./IQuizRepository";

export interface ISubmitQuizFactory {
    quizRepository(): IQuizRepository;
    clientRepository(): IClientRepository;
    mediator(): IMediator;
}
