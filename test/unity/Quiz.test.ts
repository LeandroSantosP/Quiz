import { Category } from "@/domain/quiz/Category";
import { Evaluation } from "@/domain/quiz/Evaluation";
import { Question } from "@/domain/quiz/Question";
import { Quiz } from "@/domain/quiz/Quiz";

test("Deve criar um quiz", () => {
    const quiz = Quiz.create("Programming", "123");
    expect(quiz.id).toBeDefined();
    expect(quiz.quizName).toBeDefined();
});

test("Deve criar um quiz e adicionar questões", () => {
    const quiz = Quiz.create("Programming", "123");

    quiz.addQuestion(new Question("What is your name?", { 1: "Leandro", 2: "Joao" }, 1));
    expect(quiz.questions.length).toBe(1);
});

test("Deve Responder o quiz e retornar a media!", () => {
    const quiz = Quiz.create("Programming", "123");
    quiz.addQuestion(
        new Question("Javascript is batter than rest?", { 1: "Yes", 2: "No" }, 1),
        new Question(
            "What is the name of the technology used to run JS outside the browser?",
            {
                1: "Jest js",
                2: "Angular js",
                3: "Node js",
            },
            3
        )
    );

    const average = quiz.getAverage([
        { questionName: "Javascript is batter than rest?", answer: 1 },
        {
            questionName: "What is the name of the technology used to run JS outside the browser?",
            answer: 2,
        },
    ]);
    expect(average.grade).toBe(50);
});

test("Deve lacar um erro caso tente responder uma questão nao cadastrada", () => {
    const quiz = Quiz.create("Programming", "123");
    expect(() => quiz.getAverage([{ questionName: "Invalid Question", answer: 1 }])).toThrow(
        new Error("Question not found")
    );
});

test("Deve ser possível avaliar o quiz dando uma nota de 0 a 5", () => {
    const quiz = Quiz.create("Programming", "123");

    const evaluation_one = {
        client_id: "124",
        note: 1,
    };
    const evaluation_two = {
        client_id: "124",
        note: 1,
    };

    quiz.addEvaluation(evaluation_one, evaluation_two);
    expect(quiz.evaluations.length).toBe(2);
    expect(quiz.evaluations[0].client_id).toBe("124");
});

test("Deve ser possível adicionar categorias as quiz", () => {
    const quiz = Quiz.create("Programming", "123");

    quiz.addCategory(
        new Category(
            "Technology",
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'C"
        )
    );

    expect(quiz.categories.length).toBe(1);
    expect(quiz.categories[0].name).toBe("Technology");
});

test("Deve calcular a media das avaliações", () => {
    const quiz = Quiz.create("Programming", "123");

    quiz.evaluations = [
        { client_id: "123", note: 2, quizId: "123" },
        { client_id: "123", note: 5, quizId: "123" },
    ];

    const media = quiz.calculateEvaluationMedia();

    expect(media).toBe(3.5);
});
