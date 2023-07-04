import { randomUUID } from "crypto";

export class Category {
    constructor(readonly name: string, readonly description: string, readonly id: string = randomUUID()) {
        if (description.length < 30) throw new Error("Description must be grater than 30 caracteres!");
    }
}
