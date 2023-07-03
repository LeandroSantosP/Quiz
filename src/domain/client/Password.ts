import { Encrypt } from "@/infra/interfaces/Encrypt";

export class Password {
    value: string;
    constructor(value: string, private readonly encrypt: Encrypt) {
        this.value = value;
    }

    async encryptPass() {
        this.value = await this.encrypt.encrypt(this.value);
    }
}
