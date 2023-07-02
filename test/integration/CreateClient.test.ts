import { CreateClientUsecase } from "@/application/usecase/CreateClientUsecase";
import { ClientRepositoryMemory } from "@/infra/repositories/ClientRepositoryMemory";

test("Deve criar um client", async () => {
    const clientRepository = new ClientRepositoryMemory();
    const createClient = new CreateClientUsecase(clientRepository);

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
