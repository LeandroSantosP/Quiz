import { DomainEvent } from "@/domain/event/DomainEvent";
import { IHandler } from "../../application/interfaces/IHandler";
import { IMediator } from "./IMediator";

export class Mediator implements IMediator {
    handles: IHandler[];

    constructor() {
        this.handles = [];
    }

    static instance: Mediator;

    static getInstance() {
        if (!this.instance) {
            this.instance = new Mediator();
        }
        return this.instance;
    }
    async publisher(event: DomainEvent): Promise<void> {
        for (const handler of this.handles) {
            if (handler.eventName === event.name) {
                handler.handle(event);
            }
        }
    }

    register(handler: IHandler): void {
        this.handles.push(handler);
    }
}
