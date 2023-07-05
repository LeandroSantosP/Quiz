import { CreateClientUsecase } from "@/application/usecase/CreateClientUsecase";
import { ClientRepositoryMemory } from "@/infra/repositories/ClientRepositoryMemory";
import { BcryptAdapter } from "@/infra/service/BcryptAdapter";

test("Deve criar um client", async () => {
    const clientRepository = new ClientRepositoryMemory();
    const encrypt = new BcryptAdapter();
    const createClient = new CreateClientUsecase(clientRepository, encrypt);

    const input = {
        name: "JoeDoe",
        email: "joeDoe@gmail.com",
        password: "senha123",
        age: 25,
        country: "Brasil",
        occupation: "Estudante",
    };
    await createClient.execute(input);

    const client = await clientRepository.getByEmail(input.email);

    expect(client).not.toBeNull();
    expect(client.name).toBe("JoeDoe");
    expect(client.country).toBe("Brasil");
    expect(client.occupation).toBe("Estudante");
});
