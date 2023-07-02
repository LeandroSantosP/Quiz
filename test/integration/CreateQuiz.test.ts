import { CreateQuizUseCase, Input } from "@/application/usecase/CreateQuizUseCase";
import { QuizRepositoryMemory } from "@/infra/repositories/QuizRepositoryMemory";

test("Deve criar um quiz", async () => {
    const quizRepository = new QuizRepositoryMemory();
    const createQuiz = new CreateQuizUseCase(quizRepository);
    const input = {
        quizName: "Programming",
        questions: [
            {
                questionName: "Javascript is batter than rest?",
                answers: {
                    1: "Yes",
                    2: "no",
                },
                correctAnswer: 1,
            },
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answers: {
                    1: "Jest js",
                    2: "Angular js",
                    3: "Node js",
                },
                correctAnswer: 3,
            },
        ],
    } as Input;

    await createQuiz.execute(input);

    expect(quizRepository.quizz.length).toBe(1);
    expect(quizRepository.quizz[0].quizName).toBe("Programming");
    expect(quizRepository.quizz[0].questions[0].correctAnswer).toBe(1);
    expect(quizRepository.quizz[0].questions[1].correctAnswer).toBe(3);
});
