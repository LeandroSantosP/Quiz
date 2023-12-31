import { SubmitQuizUsecase } from "@/application/usecase/SubmitQuizUsecase";
import { GenericClient } from "../utils/GeneticClient";
import { ClientRepositoryMemory } from "@/infra/repositories/ClientRepositoryMemory";
import { MailerMemory } from "@/infra/service/MailerMemory";
import { Mediator } from "@/infra/mediator/Mediator";
import { QuizSubmittedHandler } from "@/application/handler/QuizSubmittedHandler";
import { IMediator } from "@/infra/mediator/IMediator";
import { SubmitQuizFactoryMemory } from "@/infra/factory/SubmitQuizFactoryMemory";

let mediator: IMediator;
let mailerMemory: MailerMemory;
let clientRepository: ClientRepositoryMemory;
let submitQuiz: SubmitQuizUsecase;

beforeEach(() => {
    mediator = Mediator.getInstance();
    clientRepository = ClientRepositoryMemory.getInstance();
    mailerMemory = new MailerMemory();

    const quizSubmittedHandler = new QuizSubmittedHandler(clientRepository, mailerMemory);

    mediator.register(quizSubmittedHandler);
    submitQuiz = new SubmitQuizUsecase(new SubmitQuizFactoryMemory());
});
test("Deve submeter um quiz e retornar a nota juntamente com as questões acertadas e erradas", async () => {
    const client = GenericClient.create({});
    await clientRepository.save(client);

    const input = {
        quizId: "1234",
        client_id: client.id,
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
    const input = {
        quizId: "12345",
        client_id: "123",
        answers: [
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };

    await expect(() => submitQuiz.execute(input)).rejects.toThrowError();
});

test("Deve submeter o quiz e Salvar a pontuação do client e calcular a nota", async () => {
    const client = GenericClient.create({});

    await clientRepository.save(client);

    const input = {
        quizId: "1234",
        client_id: client.id,
        answers: [
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };

    await submitQuiz.execute(input);

    const client_updated = await clientRepository.getByEmail(client.getEmail());
    expect(client_updated.score).toBe(50);
});

test("Deve submeter o quiz e Salvar a pontuação do client e calcular a nota e um email deve ser enviado", async () => {
    const client = GenericClient.create({});
    await clientRepository.save(client);

    const input = {
        quizId: "1234",
        client_id: client.id,
        answers: [
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };

    await submitQuiz.execute(input);
    expect(mailerMemory.messages[0].message).toBe("Ola JoeDoe sua nota do quiz foi 50");
});

test("Deve submeter um quiz e salvar o quiz com maior pontuação!", async () => {
    const client = GenericClient.create({
        email: "joao@gmil.com",
        id: "9999",
    });
    await clientRepository.save(client);

    const inputOne = {
        quizId: "1234",
        client_id: client.id,
        answers: [
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };

    const inputTwo = {
        quizId: "1234",
        client_id: client.id,
        answers: [
            {
                questionName: "Javascript is batter than rest?",
                answer: 1,
            },
            {
                questionName: "What is the name of the technology used to run JS outside the browser?",
                answer: 3,
            },
        ],
    };
    await submitQuiz.execute(inputOne);
    await submitQuiz.execute(inputTwo);

    const clientUpdated = await clientRepository.getByEmail("joao@gmil.com");

    expect(clientUpdated.getMaxScore()).toBe(100);
});
