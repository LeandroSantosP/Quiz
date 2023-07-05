import { Client } from "@/domain/client/Client";
import { Email } from "@/domain/client/Email";
import { Password } from "@/domain/client/Password";
import { BcryptAdapter } from "@/infra/service/BcryptAdapter";

const encrypt = new BcryptAdapter();
test("Deve criar um client", async () => {
    const client = new Client(
        "123",
        "Leandro",
        new Password("senha123", encrypt),
        new Email("joe.john@gmail.com"),
        22,
        "Brasil",
        "Estudante"
    );

    expect(client.id).toBe("123");
    expect(client.getEmail()).toBe("joe.john@gmail.com");
    expect(client.getPassword()).toBeDefined();
});

test("Deve lançar um erro caso o email seja invalido!", () => {
    expect(
        () =>
            new Client(
                "123",
                "Leandro",
                new Password("senha123", encrypt),
                new Email("joe.johngmail.com"),
                22,
                "Brasil",
                "Estudante"
            )
    ).toThrow(new Error("Invalid Email"));
});

test("Deve atualizar o max score do client", () => {
    const client = new Client(
        "123",
        "Leandro",
        new Password("senha123", encrypt),
        new Email("joe.john@gmail.com"),
        22,
        "Brasil",
        "Estudante"
    );

    client.updatedMaxScore(40);
    expect(client.getMaxScore()).toBe(40);
});

test("not Deve atualizar o max score do client caso ele seja inferior ao ja cadastrado.", () => {
    const client = new Client(
        "123",
        "Leandro",
        new Password("senha123", encrypt),
        new Email("joe.john@gmail.com"),
        22,
        "Brasil",
        "Estudante"
    );

    client.updatedMaxScore(1000);
    client.updatedMaxScore(40);
    expect(client.getMaxScore()).toBe(1000);
});
