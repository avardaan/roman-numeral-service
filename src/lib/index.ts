import {
	IntToRomanInputConstraints,
	intToRomanInvalidIntegerInputErrorMessage,
	intToRomanInvalidMapErrorMessage,
} from './utils';

// ordered map of integer values to roman symbols
export const INT_TO_ROMAN_MAP: Map<number, string> = new Map([
	[1000, 'M'],
	[900, 'CM'],
	[500, 'D'],
	[400, 'CD'],
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

/**
 *
 * @param intInput integer to be converted to roman numeral string
 * @returns converted roman numeral string
 */
export function intToRomanNumeral(intInput: number, intToRomanMap: Map<number, string>): string {
	// validate integer input
	const isIntegerInputValid: boolean =
		Number.isInteger(intInput) &&
		intInput >= IntToRomanInputConstraints.MIN &&
		intInput <= IntToRomanInputConstraints.MAX;

	// throw if input is invalid
	if (!isIntegerInputValid) {
		throw new Error(intToRomanInvalidIntegerInputErrorMessage(intInput));
	}

	// validate map
	if (!intToRomanMap || intToRomanMap.size === 0) {
		throw new Error(intToRomanInvalidMapErrorMessage(intToRomanMap));
	}

	let romanNumeral: string = '';
	// perform conversion
	intToRomanMap.forEach((romanSymbol: string, intValue: number) => {
		while (intInput >= intValue) {
			romanNumeral += romanSymbol;
			intInput -= intValue;
		}
	});
	return romanNumeral;
}
