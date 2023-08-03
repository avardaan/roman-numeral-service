import { IntToRomanMap } from './types';

const intToRomanMap: IntToRomanMap = [
	{ intValue: 100, romanSymbol: 'C' },
	{ intValue: 90, romanSymbol: 'XC' },
	{ intValue: 50, romanSymbol: 'L' },
	{ intValue: 40, romanSymbol: 'XL' },
	{ intValue: 10, romanSymbol: 'X' },
	{ intValue: 9, romanSymbol: 'IX' },
	{ intValue: 5, romanSymbol: 'V' },
	{ intValue: 4, romanSymbol: 'IV' },
	{ intValue: 1, romanSymbol: 'I' },
];

export function intToRoman(intInput: number): string {
	// add input validation
	let romanNumeral: string = '';
	for (const { intValue, romanSymbol } of intToRomanMap) {
		while (intInput >= intValue) {
			romanNumeral += romanSymbol;
			intInput -= intValue;
		}
	}
	return romanNumeral;
}
