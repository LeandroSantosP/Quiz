import { Mailer } from "@/application/interfaces/IMailer";

export class MailerMemory implements Mailer {
    messages: Message[] = [];
    async send(input: { from: string; to: string; message: string }): Promise<void> {
        this.messages.push(input);
        console.log(input.message);
    }
}

type Message = {
    from: string;
    to: string;
    message: string;
};
