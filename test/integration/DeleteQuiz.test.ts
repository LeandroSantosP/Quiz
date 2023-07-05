import { DeleteQuizUsecase } from "@/application/usecase/DeleteQuizUsecase";
import { Quiz } from "@/domain/quiz/Quiz";
import { QuizRepositoryMemory } from "@/infra/repositories/QuizRepositoryMemory";

test("Deve ser possível deletar um quiz.", async () => {
    const quiz = new Quiz("12345", "Technology");

    const quizRepository = new QuizRepositoryMemory();

    await quizRepository.save(quiz);

    const deleteQuiz = new DeleteQuizUsecase(quizRepository);

    const input = {
        quizIds: ["1234", "12345"],
    };
    await deleteQuiz.execute(input);

    expect(quizRepository.quizz.length).toBe(0);
});
