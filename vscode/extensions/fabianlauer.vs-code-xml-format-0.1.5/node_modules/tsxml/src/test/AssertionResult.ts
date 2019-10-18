export class AssertionResult {
	constructor(private _unitTestID: number, private _successful: boolean, private _description: string) { }


	public get unitTestID(): number {
		return this._unitTestID;
	}


	public get successful(): boolean {
		return this._successful;
	}


	public get description(): string {
		return this._description;
	}
}