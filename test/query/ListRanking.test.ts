import { ListRankingQuery } from "@/application/query/ListRankingQuery";
import { ClientDAOMemory } from "@/infra/DAO/ClientDAOMemory";

test("Deve listar o ranking baseado na pontuação, do maior para o menor", async () => {
    const clientDAO = new ClientDAOMemory();

    clientDAO.clients = [
        { email: "joeDoe@gmail.com", id: "123", age: 20, score: 20, name: "Joe Doe" },
        { email: "joao@gmail.com", id: "1234", age: 20, score: 100, name: "João" },
    ];

    const ListRanking = new ListRankingQuery(clientDAO);
    const output = await ListRanking.execute();

    expect(output.ranking.length).toBe(2);

    expect(output.ranking[0].score).toBe(100);
    expect(output.ranking[0].position).toBe(1);

    expect(output.ranking[1].score).toBe(20);
    expect(output.ranking[1].position).toBe(2);
});
