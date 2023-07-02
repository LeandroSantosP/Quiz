import { IQuizRepository } from "../interfaces/IQuizRepository";

export class SubmitQuizUsecase {
    constructor(private readonly quizRepository: IQuizRepository) {}

    async execute(input: Input): Promise<Output> {
        const quiz = await this.quizRepository.get(input.quizId);

        const response = quiz.getAverage(input.answers);

        const output: Output = {
            ...response,
        };

        return output;
    }
}

type Input = {
    quizId: string;
    answers: Array<{
        questionName: string;
        answer: number;
    }>;
};

type Output = {
    grade: number;
    totalQuestion: number;
    questionAnswers: number;
};
