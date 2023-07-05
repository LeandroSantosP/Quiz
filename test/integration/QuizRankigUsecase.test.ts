import { QuizRankingQuery } from "@/application/query/QuizRankingQuery";
import { ClientDAOMemory } from "@/infra/DAO/ClientDAOMemory";

test("Deve retornar o ranking do quiz (ordenados do maior para o menor).", async () => {
    const clientDAO = new ClientDAOMemory();

    clientDAO.clients = [
        { age: 21, email: "test1@test.com", id: "1234", name: "João", score: 10, max_score: 10 },
        { age: 22, email: "test2@test.com", id: "1235", name: "João", score: 100, max_score: 50 },
        { age: 23, email: "test3@test.com", id: "1236", name: "João", score: 3421, max_score: 1000 },
        { age: 24, email: "test4@test.com", id: "1237", name: "João", score: 2234, max_score: 1400 },
    ];
    const quizRanking = new QuizRankingQuery(clientDAO);
    const output = await quizRanking.execute();

    expect(output).toHaveLength(4);
    expect(output).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                client_id: "1237",
                score: 2234,
                max_score: 1400,
            }),
        ])
    );
});
