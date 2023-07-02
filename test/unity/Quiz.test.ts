import { Quiz } from "@/domain/Quiz";
import { Question } from "@/domain/Question";

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
            answer: 3,
        },
    ]);
    expect(average).toBe(100);
});

test("Deve lacar um erro caso tente responder uma questão nao cadastrada", () => {
    const quiz = Quiz.create("Programming", "123");
    expect(() => quiz.getAverage([{ questionName: "Invalid Question", answer: 1 }])).toThrow(
        new Error("Question not found")
    );
});
