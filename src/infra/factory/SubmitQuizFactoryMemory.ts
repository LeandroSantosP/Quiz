import { IClientRepository } from "@/application/interfaces/IClientRepository";
import { IQuizRepository } from "@/application/interfaces/IQuizRepository";
import { IMediator } from "../mediator/IMediator";

import { ISubmitQuizFactory } from "@/application/interfaces/ISubmitQuizFactory";
import { QuizRepositoryMemory } from "../repositories/QuizRepositoryMemory";
import { ClientRepositoryMemory } from "../repositories/ClientRepositoryMemory";
import { Mediator } from "../mediator/Mediator";

export class SubmitQuizFactoryMemory implements ISubmitQuizFactory {
    quizRepository(): IQuizRepository {
        return QuizRepositoryMemory.getInstance();
    }
    clientRepository(): IClientRepository {
        return ClientRepositoryMemory.getInstance();
    }
    mediator(): IMediator {
        return Mediator.getInstance();
    }
}
