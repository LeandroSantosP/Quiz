import { IQuizDAO } from "@/application/interfaces/IQuizDAO";

export const mockQuiz = { id: "1", quizName: "Programming" };

export class QuizDAOMemory implements IQuizDAO {
    quizz: { id: string; quizName: string }[] = [mockQuiz];
    async getAll(): Promise<any[]> {
        return this.quizz;
    }
}
