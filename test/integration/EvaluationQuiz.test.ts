import { QuizRepositoryMemory } from "@/infra/repositories/QuizRepositoryMemory";
import { GenericClient } from "../utils/GeneticClient";
import { Quiz } from "@/domain/quiz/Quiz";
import { EvaluationQuizUsecase } from "@/application/usecase/EvaluationQuizUsecase";
import { Mediator } from "@/infra/mediator/Mediator";
import { QuizEvaluatedHandler } from "@/application/handler/QuizEvaluatedHandler";
import { ClientRepositoryMemory } from "@/infra/repositories/ClientRepositoryMemory";
import { MailerMemory } from "@/infra/service/MailerMemory";

test("Deve ser possível Avaliar um quiz e enviar um email de sucesso.", async () => {
    const clientRepository = new ClientRepositoryMemory();

    const quizRepository = new QuizRepositoryMemory();

    const mailer = new MailerMemory();

    const genericClient = GenericClient.create({ id: "111222", email: "joeDoe@gmail.com" });

    await clientRepository.save(genericClient);

    const quiz = new Quiz("1233", "Technology");
    quiz.addEvaluation({ client_id: genericClient.id, note: 2 });

    await quizRepository.save(quiz);
    const mediator = Mediator.getInstance();

    mediator.register(new QuizEvaluatedHandler(mailer));

    const evaluationQuiz = new EvaluationQuizUsecase(quizRepository, clientRepository, mediator);

    const input = {
        quizId: "1233",
        clientId: "111222",
        note: 5,
    };

    const output = await evaluationQuiz.execute(input);

    expect(output.note).toBe(5);
    expect(output.media).toBe(3.5);

    expect(mailer.messages[0].to).toBe("joeDoe@gmail.com");
    expect(mailer.messages[0].message).toBe(
        "Ola QuizEvaluated, uma avaliação foi realizada no quiz Technology com resultado 5, a media total 3.5"
    );
    expect(quizRepository.quizz[1].evaluations).toHaveLength(2);
    expect(quizRepository.quizz[1].evaluations).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                client_id: "111222",
                note: 2,
            }),
        ])
    );
});
