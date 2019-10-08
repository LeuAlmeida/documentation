export class Event<THandler extends Function> {
	public bind(handler: THandler): THandler {
		if (this.handlers)
			this.handlers.push(handler);
		else
			this.handlers = [handler];
		
		return handler;
	}
	
	
	public once(handler: THandler): void {
		this.bind(<any>(() => {
			this.unbind(handler);
			handler.apply(null, arguments);
		}));
	}
	
	
	public unbind(handler: THandler): void {
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
	
	
	public trigger(...args: any[]): void {
		if (this.handlers && this.handlers.length > 0) {
			this.handlers.forEach(handler => handler.apply(null, args));
		}
	}
	
	
	private handlers: THandler[];
}