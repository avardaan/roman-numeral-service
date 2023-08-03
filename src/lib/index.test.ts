import { intToRomanNumeral, INT_TO_ROMAN_BASE_MAP } from '.';
import { RomanNumeralIntInputConstraints } from '../api/constants';
import {
	IntToRomanInputConstraints,
	intToRomanInvalidIntegerInputErrorMessage,
	intToRomanInvalidMapErrorMessage,
} from './utils';

// testing inputs
const invalidIntegerInputs: any[] = [
	null,
	undefined,
	NaN,
	Infinity,
	-Infinity,
	'',
	'foo',
	55.5,
	RomanNumeralIntInputConstraints.MIN - 1,
	RomanNumeralIntInputConstraints.MAX + 1,
];
const validIntegerToRomanNumeralMap: Map<number, string> = new Map([
	[42, 'XLII'],
	[256, 'CCLVI'],
	[789.0, 'DCCLXXXIX'],
	[1234, 'MCCXXXIV'],
	[1987, 'MCMLXXXVII'],
	[2023.0, 'MMXXIII'],
	[3549, 'MMMDXLIX'],
	[3999, 'MMMCMXCIX'],
]);

const invalidMapInputs: any[] = [null, undefined, new Map(), {}, [], 'foo', 55];

describe('intToRomanNumeral', () => {
	invalidMapInputs.forEach((invalidMapInput) => {
		it(`should throw if map input is ${invalidMapInput}`, () => {
			expect(() => intToRomanNumeral(1, invalidMapInput)).toThrowError(
				intToRomanInvalidMapErrorMessage(invalidMapInput)
			);
		});
	});

	invalidIntegerInputs.forEach((invalidIntegerInput) => {
		it(`should throw if integer input is ${invalidIntegerInput}`, () => {
			expect(() => intToRomanNumeral(invalidIntegerInput, INT_TO_ROMAN_BASE_MAP)).toThrowError(
				intToRomanInvalidIntegerInputErrorMessage(invalidIntegerInput)
			);
		});
	});

	validIntegerToRomanNumeralMap.forEach((expectedOutput, input) => {
		it(`should convert integer:${input} to roman:${expectedOutput}`, () => {
			expect(intToRomanNumeral(input, INT_TO_ROMAN_BASE_MAP)).toBe(expectedOutput);
		});
	});
});
