import { randomUUID } from "crypto";
import { Question } from "./Question";

export class Quiz {
    questions: Question[] = [];
    constructor(readonly id: string, readonly quizName: string) {}

    static create(quizName: string, id: string = randomUUID()) {
        return new Quiz(id, quizName);
    }

    addQuestion(...questions: Question[]) {
        for (const question of questions) {
            this.questions.push(question);
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

        return (total / QuestionsAnswers.length) * 100;
    }
}
