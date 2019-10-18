"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    bind(handler) {
        if (this.handlers)
            this.handlers.push(handler);
        else
            this.handlers = [handler];
        return handler;
    }
    once(handler) {
        this.bind((() => {
            this.unbind(handler);
            handler.apply(null, arguments);
        }));
    }
    unbind(handler) {
        if (this.handlers && this.handlers.length > 0) {
            let index = this.handlers.indexOf(handler);
            while (index !== -1) {
                this.handlers.splice(index, 1);
                index = this.handlers.indexOf(handler);
            }
        }
        if (this.handlers.length === 0)
            this.handlers = undefined;
    }
    trigger(...args) {
        if (this.handlers && this.handlers.length > 0) {
            this.handlers.forEach(handler => handler.apply(null, args));
        }
    }
}
exports.Event = Event;
