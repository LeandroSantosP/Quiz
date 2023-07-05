import { Evaluation } from "@/domain/quiz/Evaluation";
import { CalculateEvaluationMedia } from "@/domain/services/CalculateEvaluationMedia";

test("Deve ser possível calcular a media das avaliações de um quiz", () => {
    const evaluation = [new Evaluation("124", "1234", 5), new Evaluation("123", "1234", 2)];
    const calculatorEvaluationMedia = new CalculateEvaluationMedia(evaluation);

    const media = calculatorEvaluationMedia.calculate();

    expect(media).toBe(3.5);
});
