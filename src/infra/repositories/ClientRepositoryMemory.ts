import { IClientRepository, SaveOutput } from "@/application/interfaces/IClientRepository";
import { Client } from "@/domain/Client";

export class ClientRepositoryMemory implements IClientRepository {
    clients: Client[] = [];
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
}
