import { intToRomanNumeral, INT_TO_ROMAN_MAP } from '.';
import {
	IntToRomanInputConstraints,
	intToRomanInvalidIntegerInputErrorMessage,
	intToRomanInvalidMapErrorMessage,
} from './utils';

// testing inputs
const invalidFloatInput: number = 1.1;
const invalidIntBelowMinInput: number = IntToRomanInputConstraints.MIN - 1;
const invalidIntAboveMaxInput: number = IntToRomanInputConstraints.MAX + 1;
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
	it('should throw if map input is null', () => {
		expect(() => intToRomanNumeral(1, null)).toThrowError(intToRomanInvalidMapErrorMessage(null));
	});

	it('should throw if map input is undefined', () => {
		expect(() => intToRomanNumeral(1, undefined)).toThrowError(
			intToRomanInvalidMapErrorMessage(undefined)
		);
	});

	it('should throw if map input is an empty Map', () => {
		expect(() => intToRomanNumeral(1, new Map())).toThrowError(
			intToRomanInvalidMapErrorMessage(new Map())
		);
	});

	it('should throw if integer input is null', () => {
		expect(() => intToRomanNumeral(null, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(null)
		);
	});

	it('should throw if integer input is undefined', () => {
		expect(() => intToRomanNumeral(undefined, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(undefined)
		);
	});

	it('should throw if integer input is NaN', () => {
		expect(() => intToRomanNumeral(NaN, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(NaN)
		);
	});

	it('should throw if integer input is Infinity', () => {
		expect(() => intToRomanNumeral(Infinity, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(Infinity)
		);
	});

	it('should throw if integer input is -Infinity', () => {
		expect(() => intToRomanNumeral(-Infinity, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(-Infinity)
		);
	});

	it('should throw if integer input is an empty string', () => {
		expect(() => intToRomanNumeral('' as any, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage('' as any)
		);
	});

	it('should throw if integer input is a float not ending in .0', () => {
		expect(() => intToRomanNumeral(invalidFloatInput, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(invalidFloatInput)
		);
	});

	it('should throw if integer input is below minimum', () => {
		expect(() => intToRomanNumeral(invalidIntBelowMinInput, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(invalidIntBelowMinInput)
		);
	});

	it('should throw if integer input is above maximum', () => {
		expect(() => intToRomanNumeral(invalidIntAboveMaxInput, INT_TO_ROMAN_MAP)).toThrowError(
			intToRomanInvalidIntegerInputErrorMessage(invalidIntAboveMaxInput)
		);
	});

	validIntegerToRomanNumeralMap.forEach((expectedOutput, input) => {
		it(`should convert integer:${input} to roman:${expectedOutput}`, () => {
			expect(intToRomanNumeral(input, INT_TO_ROMAN_MAP)).toBe(expectedOutput);
		});
	});
});
