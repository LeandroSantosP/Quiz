export interface IClientDAO {
    list(): Promise<ClientDAO[]>;
}

export type ClientDAO = {
    id: string;
    name: string;
    email: string;
    score: number;
    age: number;
};
