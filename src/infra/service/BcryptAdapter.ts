import { hash } from "bcrypt";
import { Encrypt } from "../interfaces/Encrypt";

export class BcryptAdapter implements Encrypt {
    async encrypt(value: string): Promise<string> {
        return hash(value, 10);
    }
}
