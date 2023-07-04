import { ClientDAO, IClientDAO } from "@/application/interfaces/IClientDAO";

export class ClientDAOMemory implements IClientDAO {
    clients: ClientDAO[] = [];
    async list(): Promise<ClientDAO[]> {
        return this.clients;
    }
}
