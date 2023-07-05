import { IQuizRepository } from "../interfaces/IQuizRepository";

export class DeleteQuizUsecase {
    constructor(private readonly quizRepository: IQuizRepository) {}

    async execute(input: Input): Promise<void> {
        for (const quizId of input.quizIds) {
            const currentQuiz = await this.quizRepository.get(quizId);
            await this.quizRepository.delete(currentQuiz);
        }
        return Promise.resolve();
    }
}

type Input = {
    quizIds: string[];
};
