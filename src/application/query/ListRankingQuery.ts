import { IClientDAO } from "../interfaces/IClientDAO";

export class ListRankingQuery {
    constructor(private readonly clientDAO: IClientDAO) {}

    async execute(): Promise<Output> {
        const ranking = await this.clientDAO.list();

        const client_sorted = ranking.sort((a, b) => b.score - a.score);

        const output: Output = { ranking: [] };

        for (let i = 0; i < client_sorted.length; i++) {
            output.ranking.push({
                client_id: client_sorted[i].id,
                name: client_sorted[i].name,
                score: client_sorted[i].score,
                position: i + 1,
            });
        }

        return output;
    }
}

type Output = {
    ranking: Array<{
        client_id: string;
        name: string;
        score: number;
        position: number;
    }>;
};
