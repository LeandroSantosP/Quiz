import { SubmitQuizUsecase } from "@/application/usecase/SubmitQuizUsecase";
import { QuizRepositoryMemory } from "@/infra/repositories/QuizRepositoryMemory";

test("Deve submeter um quiz e retornar a nota juntamente com as questões acertadas e erradas", async () => {
    const quizRepository = new QuizRepositoryMemory();

    const submitQuiz = new SubmitQuizUsecase(quizRepository);

    const input = {
        quizId: "1234",
        answers: [
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };

    const output = await submitQuiz.execute(input);

    expect(output.grade).toBe(50);
    expect(output.totalQuestion).toBe(2);
    expect(output.questionAnswers).toBe(1);
});

test("Deve Lançar um erro caso o quiz nao exista", async () => {
    const quizRepository = new QuizRepositoryMemory();

    const submitQuiz = new SubmitQuizUsecase(quizRepository);

    const input = {
        quizId: "12345",
        answers: [
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };

    await expect(() => submitQuiz.execute(input)).rejects.toThrowError();
});
