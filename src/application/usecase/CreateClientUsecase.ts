import { Client } from "@/domain/Client";
import { IClientRepository } from "../interfaces/IClientRepository";

export class CreateClientUsecase {
    constructor(readonly clientRepository: IClientRepository) {}
    async execute(input: Input): Promise<Output> {
        const newClient = new Client("", input.name, input.email, input.age, input.country, input.occupation);
        return await this.clientRepository.save(newClient);
    }
}

type Input = {
    name: string;
    email: string;
    password: string;
    age: number;
    country: string;
    occupation: string;
};

type Output = {
    client_id: string;
};
