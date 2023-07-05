import { IClientDAO } from "../interfaces/IClientDAO";
import { IQuizDAO } from "../interfaces/IQuizDAO";

export class QuizRankingQuery {
    constructor(private readonly quizDAO: IClientDAO) {}
    async execute() {
        return this.quizDAO.getRanking();
    }
}
