import { DomainEvent } from "@/domain/event/DomainEvent";
import { IHandler } from "../../application/interfaces/IHandler";

export interface IMediator {
    publisher(event: DomainEvent): Promise<void>;
    register(handler: IHandler): void;
}
