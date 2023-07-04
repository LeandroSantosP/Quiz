import { Mediator } from "@/infra/mediator/Mediator";
import { IQuizRepository } from "../interfaces/IQuizRepository";
import { QuizEvaluated } from "@/domain/event/QuizEvaluated";
import { IClientRepository } from "../interfaces/IClientRepository";

export class EvaluationQuizUsecase {
    constructor(
        private readonly quizRepository: IQuizRepository,
        readonly clientRepository: IClientRepository,
        private readonly mediator: Mediator
    ) {}

    async execute(input: Input): Promise<Output> {
        const client = await this.clientRepository.getById(input.clientId);
        const quiz = await this.quizRepository.get(input.quizId);
        quiz.addEvaluation({ note: input.note, client_id: input.clientId });
        await this.quizRepository.updated(quiz);

        const media = quiz.calculateEvaluationMedia();

        const quizEvaluated = new QuizEvaluated(
            input.clientId,
            client.name,
            client.getEmail(),
            input.note,
            media,
            quiz.quizName
        );
        await this.mediator.publisher(quizEvaluated);

        return {
            media,
            note: input.note,
        };
    }
}

type Input = {
    quizId: string;
    clientId: string;
    note: number;
};
type Output = {
    note: number;
    media: number;
};
