import { Client } from "@/domain/Client";

export interface IClientRepository {
    save(input: Client): Promise<SaveOutput>;
    getByEmail(email: string): Promise<Client>;
}

export type SaveOutput = {
    client_id: string;
};
