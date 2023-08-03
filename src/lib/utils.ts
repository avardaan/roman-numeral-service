export enum IntToRomanInputConstraints {
	MIN = 1,
	MAX = 3999,
}

export function intToRomanInvalidIntegerInputErrorMessage(intInput: number): string {
	return `Invalid input [intInput=${intInput}] - must be an integer between \
	${IntToRomanInputConstraints.MIN} and ${IntToRomanInputConstraints.MAX} (inclusive).`;
}

export function intToRomanInvalidMapErrorMessage(intToRomanMap: Map<number, string>): string {
	return `Invalid map [intToRomanMap=${intToRomanMap}] - must be a non-empty \
	Map<number, string> containing required integer to roman numeral mapping.`;
}
