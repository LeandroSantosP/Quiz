export interface IClientDAO {
    list(): Promise<ClientDAO[]>;
    getRanking(): Promise<GetRankingOutput[]>;
}

export type ClientDAO = {
    id: string;
    name: string;
    email: string;
    score: number;
    max_score: number;
    age: number;
};

export type GetRankingOutput = {
    client_id: string;
    score: number;
    max_score: number;
};
