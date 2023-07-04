import { Quiz } from "@/domain/quiz/Quiz";

export interface IQuizRepository {
    save(quiz: Quiz): Promise<void>;
    get(quizId: string): Promise<Quiz>;
    updated(quiz: Quiz): Promise<void>;
}

export type GetEvaluationMediaOutput = {
    noteUpdated: number;
};
