import { Quiz } from "@/domain/Quiz";

export interface IQuizRepository {
    save(quiz: Quiz): Promise<void>;
    get(quizId: string): Promise<Quiz>;
}
