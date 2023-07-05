import { Evaluation } from "../quiz/Evaluation";

export class CalculateEvaluationMedia {
    constructor(readonly evaluations: Evaluation[]) {}
    calculate() {
        let total = 0;
        for (const evaluation of this.evaluations) {
            total += evaluation.note;
        }
        return total / this.evaluations.length;
    }
}
