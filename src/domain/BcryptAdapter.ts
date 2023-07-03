import { hash } from "bcrypt";
import { Encrypt } from "./Encrypt";

export class BcryptAdapter implements Encrypt {
    async encrypt(value: string): Promise<string> {
        return hash(value, 10);
    }
}
