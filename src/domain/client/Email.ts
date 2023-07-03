export class Email {
    value: string;
    constructor(value: string) {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
            throw new Error("Invalid Email");
        }
        this.value = value;
    }
}
