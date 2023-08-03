import { intToRomanNumeral, INT_TO_ROMAN_BASE_MAP } from '.';
import {
	IntToRomanInputConstraints,
	intToRomanInvalidIntegerInputErrorMessage,
	intToRomanInvalidMapErrorMessage,
} from './utils';

// testing inputs
const invalidMapInputs: any[] = [null, undefined, new Map(), {}, [], 'foo', 55];
const invalidIntegerInputs: any[] = [
	null,
	undefined,
	NaN,
	Infinity,
	-Infinity,
	'',
	'foo',
	55.5,
	IntToRomanInputConstraints.MIN - 1,
	IntToRomanInputConstraints.MAX + 1,
	"222''",
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

	validIntegerToRomanNumeralMap.forEach((expectedValidRomanOutput, validIntegerInput) => {
		it(`should convert integer:${validIntegerInput} to roman:${expectedValidRomanOutput}`, () => {
			expect(intToRomanNumeral(validIntegerInput, INT_TO_ROMAN_BASE_MAP)).toBe(expectedValidRomanOutput);
		});
	});
});
