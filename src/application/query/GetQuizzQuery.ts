import { IQuizDAO } from "../interfaces/IQuizDAO";

export class GetQuizzQuery {
    constructor(private readonly quizDAO: IQuizDAO) {}
    async execute(): Promise<Output> {
        return await this.quizDAO.getAll();
    }
}

type Output = {
    id: string;
    quizName: string;
}[];
