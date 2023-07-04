import { Evaluation } from "@/domain/quiz/Evaluation";

test("Deve criar uma avaliação", () => {
    const evaluation = new Evaluation("123", "1234", 5);
    expect(evaluation.quizId).toBe("123");
});

test("Deve lacar um erro quando passar uma nota invalida", () => {
    expect(() => new Evaluation("123", "1234", 10)).toThrowError("Note must be between 0 and 5");
    expect(() => new Evaluation("123", "1234", -10)).toThrowError("Note must be between 0 and 5");
});
