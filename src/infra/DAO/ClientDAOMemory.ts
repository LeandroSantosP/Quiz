import { ClientDAO, GetRankingOutput, IClientDAO } from "@/application/interfaces/IClientDAO";

export class ClientDAOMemory implements IClientDAO {
    clients: ClientDAO[] = [];
    async list(): Promise<ClientDAO[]> {
        return this.clients;
    }

    async getRanking(): Promise<GetRankingOutput[]> {
        const clients_order = this.clients.sort((a, b) => a.score - b.score);

        const output: GetRankingOutput[] = [];

        for (const client of clients_order) {
            output.unshift({ client_id: client.id, max_score: client.max_score, score: client.score });
        }

        return output;
    }
}
