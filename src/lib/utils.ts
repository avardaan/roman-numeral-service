const INTEGER_REGEX = /^\d+$/;

export enum IntToRomanInputConstraints {
	MIN = 1,
	MAX = 3999,
}

// helper function to parse strict integer from string or number input
export function parseStrictInteger(input: string | number): number {
	// Convert input to string
	const stringValue = String(input);

	// Use a regular expression to check if the string only consists of digits
	if (INTEGER_REGEX.test(stringValue)) {
		return parseInt(stringValue, 10);
	}

	return NaN;
}

export function intToRomanInvalidIntegerInputErrorMessage(intInput: number): string {
	return `Invalid input [intInput = ${intInput}] - must be an integer between ${IntToRomanInputConstraints.MIN} and ${IntToRomanInputConstraints.MAX} (inclusive).`;
}

export function intToRomanInvalidMapErrorMessage(intToRomanMap: Map<number, string>): string {
	return `Invalid map [intToRomanMap = ${intToRomanMap}] - must be a non-empty Map<number, string> containing required integer to roman numeral mapping.`;
}
