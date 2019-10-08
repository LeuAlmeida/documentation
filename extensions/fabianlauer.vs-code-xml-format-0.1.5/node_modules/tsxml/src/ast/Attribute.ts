export abstract class Attribute<TValue> {
	public static create<TValue>(value: TValue): Attribute<TValue> {
		return new (class extends Attribute<TValue> {
			protected value = value;
		});
	}
	
	
	public valueOf(): TValue {
		return this.value;
	}
	
	
	public toString(): string {
		return this.value + '';
	}
	
	
	protected value: TValue;
}