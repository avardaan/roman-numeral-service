import { IntToRomanInputConstraints } from './constants';
import { IntToRomanMap } from './types';

// ordered
const INT_TO_ROMAN_MAP: Map<number, string> = new Map([
	[100, 'C'],
	[90, 'XC'],
	[50, 'L'],
	[40, 'XL'],
	[10, 'X'],
	[9, 'IX'],
	[5, 'V'],
	[4, 'IV'],
	[1, 'I'],
]);

export function intToRoman(intInput: number): string {
	// validate input
	const isInputValid: boolean =
		Number.isInteger(intInput) &&
		intInput >= IntToRomanInputConstraints.MIN &&
		intInput <= IntToRomanInputConstraints.MAX;

	// throw if input is invalid
	if (!isInputValid) {
		throw new Error(
			`Invalid input [intInput=${intInput}] - must be an integer between \
			${IntToRomanInputConstraints.MIN} and ${IntToRomanInputConstraints.MAX} (inclusive).`
		);
	}

	let romanNumeral: string = '';
	// perform conversion
	INT_TO_ROMAN_MAP.forEach((romanSymbol: string, intValue: number) => {
		while (intInput >= intValue) {
			romanNumeral += romanSymbol;
			intInput -= intValue;
		}
	});
	return romanNumeral;
}
