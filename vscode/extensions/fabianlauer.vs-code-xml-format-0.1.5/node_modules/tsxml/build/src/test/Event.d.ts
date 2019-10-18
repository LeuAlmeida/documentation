export declare class Event<THandler extends Function> {
    bind(handler: THandler): THandler;
    once(handler: THandler): void;
    unbind(handler: THandler): void;
    trigger(...args: any[]): void;
    private handlers;
}
