import { Ranking } from "@/domain/Ranking";

export interface IRankingRepository {
    getByClientEmail(client_email: string): Promise<Ranking>;
    save(ranking: Ranking): Promise<void>;
}
