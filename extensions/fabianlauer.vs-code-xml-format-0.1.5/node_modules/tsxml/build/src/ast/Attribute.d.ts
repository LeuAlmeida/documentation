export declare abstract class Attribute<TValue> {
    static create<TValue>(value: TValue): Attribute<TValue>;
    valueOf(): TValue;
    toString(): string;
    protected value: TValue;
}
