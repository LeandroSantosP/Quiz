import { DomainEvent } from "@/domain/event/DomainEvent";

export interface IHandler {
    eventName: string;
    handle(event: DomainEvent): Promise<void>;
}
