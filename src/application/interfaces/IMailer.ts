export interface Mailer {
    send(input: Input): Promise<void>;
}

type Input = {
    from: string;
    to: string;
    message: string;
};
