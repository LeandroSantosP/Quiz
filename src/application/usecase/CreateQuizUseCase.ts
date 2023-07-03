import { Question } from "@/domain/quiz/Question";
import { Quiz } from "@/domain/quiz/Quiz";
import { IQuizRepository } from "../interfaces/IQuizRepository";

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
