import { Client } from "@/domain/client/Client";

export interface IClientRepository {
    save(input: Client): Promise<SaveOutput>;
    getByEmail(email: string): Promise<Client>;
    getById(id: string): Promise<Client>;
}

export type SaveOutput = {
    client_id: string;
};
