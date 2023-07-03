import { QuizSubmitted } from "@/domain/event/QuizSubmitted";
import { ISubmitQuizFactory } from "../interfaces/ISubmitQuizFactory";

export class SubmitQuizUsecase {
    constructor(private readonly submitQuizFactory: ISubmitQuizFactory) {}

    async execute(input: Input): Promise<Output> {
        const quiz = await this.submitQuizFactory.quizRepository().get(input.quizId);
        const client = await this.submitQuizFactory.clientRepository().getById(input.client_id);
        const output = quiz.getAverage(input.answers);
        const event = new QuizSubmitted(quiz.id, client.id, output.grade, client.getEmail(), client.name);
        await this.submitQuizFactory.mediator().publisher(event);

        return {
            ...output,
        };
    }
}

type Input = {
    quizId: string;
    client_id: string;
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
