import { DomainEvent } from "@/domain/event/DomainEvent";
import { Handler } from "../../application/handler/Handler";

export interface IMediator {
    publisher(event: DomainEvent): Promise<void>;
    register(handler: Handler): void;
}
