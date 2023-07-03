import { Client } from "@/domain/client/Client";
import { Email } from "@/domain/client/Email";
import { Password } from "@/domain/client/Password";
import { randomUUID } from "crypto";
import { IClientRepository } from "../interfaces/IClientRepository";
import { Encrypt } from "@/infra/interfaces/Encrypt";

export class CreateClientUsecase {
    constructor(readonly clientRepository: IClientRepository, readonly encrypt: Encrypt) {}
    async execute(input: Input): Promise<Output> {
        const newClient = new Client(
            randomUUID(),
            input.name,
            new Password(input.password, this.encrypt),
            new Email(input.email),
            input.age,
            input.country,
            input.occupation
        );
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
