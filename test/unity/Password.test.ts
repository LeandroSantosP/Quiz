import { BcryptAdapter } from "@/domain/BcryptAdapter";
import { Password } from "@/domain/Password";

const encrypt = new BcryptAdapter();
test("Deve criar uma senha e criptografar ela", async () => {
    const password = new Password("senha123", encrypt);

    expect(password.value).toBe("senha123");
    await password.encryptPass();
    expect(password.value).not.toBe("senha123");
});
