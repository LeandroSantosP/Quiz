import { Email } from "./Email";
import { Password } from "./Password";

export class Client {
    constructor(
        readonly id: string,
        readonly name: string,
        private readonly password: Password,
        private readonly email: Email,
        readonly age: number,
        readonly country: string,
        readonly occupation: string,
        public score = 0,
        private maxScore = 0
    ) {}

    getEmail() {
        return this.email.value;
    }

    async getPassword() {
        await this.password.encryptPass();
        return this.password.value;
    }

    updatedMaxScore(newMaxScore: number) {
        if (newMaxScore > this.maxScore) {
            this.maxScore = newMaxScore;
        }
    }

    getMaxScore() {
        return this.maxScore;
    }
}
