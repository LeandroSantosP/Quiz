import { IClientRepository, SaveOutput } from "@/application/interfaces/IClientRepository";
import { Client } from "@/domain/client/Client";

export class ClientRepositoryMemory implements IClientRepository {
    clients: Client[] = [];

    static instance: ClientRepositoryMemory;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ClientRepositoryMemory();
        }
        return this.instance;
    }
    async save(input: Client): Promise<SaveOutput> {
        this.clients.push(input);

        return {
            client_id: input.id,
        };
    }

    async getByEmail(email: string): Promise<Client> {
        const client = this.clients.find((client) => client.getEmail() === email);
        if (!client) throw new Error("Client not found");
        return client;
    }

    async getById(id: string): Promise<Client> {
        const client = this.clients.find((client) => client.id === id);
        if (!client) throw new Error("Client not found");
        return client;
    }

    async updateScore(client_id: string, grade: number): Promise<void> {
        const client = this.clients.find((client) => client.id === client_id);
        if (!client) throw new Error("Client not found");
        client.score += grade;
    }
}
