export enum SyntaxErrorCode {
	Unknown = 0,
	UnexpectedToken = 1,
	MissingTagNameAfterNamespacePrefix,
	MissingAttrNameAfterAttrPrefix,
	IllegalNamespacePrefix,
	IllegalSelfClose,
	ExcessCloseTag,
	InvalidTagName
}