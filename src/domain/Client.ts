export class Client {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly age: number,
        readonly country: string,
        readonly occupation: string
    ) {}
}
