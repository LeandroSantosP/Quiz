import { IRankingRepository } from "@/application/interfaces/IRankingRepository";
import { Ranking } from "@/domain/Ranking";

export class RankingRepositoryMemory implements IRankingRepository {
    rankings: Ranking[] = [];
    async getByClientEmail(client_email: string): Promise<Ranking> {
        const ranking = this.rankings.find((ranking) => ranking.clientEmail === client_email);
        if (!ranking) throw new Error("Ranking not found");
        return ranking;
    }
    async save(ranking: Ranking): Promise<void> {
        this.rankings.push(ranking);
    }
}
