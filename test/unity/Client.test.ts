import { BcryptAdapter } from "@/domain/BcryptAdapter";
import { Client } from "@/domain/Client";
import { Email } from "@/domain/Email";
import { Password } from "@/domain/Password";

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
