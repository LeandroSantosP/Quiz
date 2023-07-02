import { IQuizRepository } from "@/application/interfaces/IQuizRepository";
import { Quiz } from "@/domain/Quiz";

export class QuizRepositoryMemory implements IQuizRepository {
    quizz: Quiz[] = [];
    async save(quiz: Quiz): Promise<void> {
        this.quizz.push(quiz);
    }
}
