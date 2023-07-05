import { Client } from "@/domain/client/Client";
import { Email } from "@/domain/client/Email";
import { Password } from "@/domain/client/Password";
import { BcryptAdapter } from "@/infra/service/BcryptAdapter";
import { randomUUID } from "crypto";

export class GenericClient {
    static create({ email = "joeDoe@gmail.com", id = randomUUID() }: Input) {
        return new Client(
            id,
            "JoeDoe",
            new Password("senha123", new BcryptAdapter()),
            new Email(email),
            30,
            "Brazil",
            "studying"
        );
    }
}

type Input = {
    email?: string;
    id?: string;
};
