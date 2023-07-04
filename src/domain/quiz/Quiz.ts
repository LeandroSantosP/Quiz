import { randomUUID } from "crypto";
import { Question } from "./Question";
import { Evaluation } from "./Evaluation";
import { Category } from "./Category";

export class Quiz {
    questions: Question[] = [];
    evaluations: Evaluation[] = [];
    categories: Category[] = [];

    constructor(readonly id: string, readonly quizName: string) {}

    static create(quizName: string, id: string = randomUUID()) {
        return new Quiz(id, quizName);
    }

    addQuestion(...questions: Question[]) {
        for (const question of questions) {
            this.questions.push(question);
        }
    }

    addCategory(...categories: Category[]) {
        for (const category of categories) {
            this.categories.push(category);
        }
    }

    getAverage(QuestionsAnswers: Array<{ questionName: string; answer: number }>) {
        let total = 0;
        for (const answer of QuestionsAnswers) {
            const currentQuestion = this.questions.find((question) => question.questionName === answer.questionName);
            if (!currentQuestion) throw new Error("Question not found");

            if (currentQuestion.correctAnswer === answer.answer) {
                total += 1;
            }
        }

        return {
            grade: (total / this.questions.length) * 100,
            totalQuestion: this.questions.length,
            questionAnswers: QuestionsAnswers.length,
        };
    }
    addEvaluation(...evaluations: { note: number; client_id: string }[]) {
        for (const evaluation of evaluations) {
            this.evaluations.push(new Evaluation(this.id, evaluation.client_id, evaluation.note));
        }
    }
    calculateEvaluationMedia() {
        let total = 0;
        for (const evaluation of this.evaluations) {
            total += evaluation.note;
        }
        return total / this.evaluations.length;
    }
}
