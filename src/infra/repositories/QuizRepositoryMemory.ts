import { IQuizRepository } from "@/application/interfaces/IQuizRepository";
import { Question } from "@/domain/Question";
import { Quiz } from "@/domain/Quiz";

const quiz = Quiz.create("Programming", "1234");

quiz.addQuestion(
    new Question("Javascript is batter than rest?", { 1: "Yes", 2: "No" }, 1),
    new Question(
        "What is the name of the technology used to run JS outside the browser?",
        {
            1: "Jest js",
            2: "Angular js",
            3: "Node js",
        },
        3
    )
);

export class QuizRepositoryMemory implements IQuizRepository {
    quizz: Quiz[] = [quiz];
    async save(quiz: Quiz): Promise<void> {
        this.quizz.push(quiz);
    }

    async get(quizId: string): Promise<Quiz> {
        const quiz = this.quizz.find((quiz) => quiz.id === quizId);
        if (!quiz) throw new Error("Quiz not found");
        return quiz;
    }
}
