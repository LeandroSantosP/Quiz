import { Quiz } from "@/domain/Quiz";
import { IQuizRepository } from "../interfaces/IQuizRepository";
import { Question } from "@/domain/Question";

export class CreateQuizUseCase {
    constructor(private readonly quizRepository: IQuizRepository) {}

    async execute(input: Input): Promise<void> {
        const quiz = Quiz.create(input.quizName);
        for (const question of input.questions) {
            quiz.addQuestion(new Question(question.questionName, question.answers, question.correctAnswer));
        }

        await this.quizRepository.save(quiz);
    }
}

export type QuestionInput = {
    questionName: string;
    answers: { [key: number]: string };
    correctAnswer: number;
};

export type Input = {
    quizName: string;
    questions: Array<QuestionInput>;
};
