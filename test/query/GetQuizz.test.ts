import { GetQuizzQuery } from "@/application/query/GetQuizzQuery";
import { QuizDAOMemory } from "@/infra/DAO/QuizDAOMemory";

test("Deve obter todos os quizzes ja cadastrados", async () => {
    const quizDAO = new QuizDAOMemory();

    const getQuizz = new GetQuizzQuery(quizDAO);

    const output = await getQuizz.execute();

    expect(output).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                quizName: "Programming",
                id: "1",
            }),
        ])
    );
});
