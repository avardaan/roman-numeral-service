export enum IntToRomanNumeralQueryParamRange {
	MIN = 1,
	MAX = 3999,
}

export function getIntToRomanNumeralRouteHandlerErrorMessage(inputIntAsString: string): string {
	return `Invalid or missing param [query=${inputIntAsString}] - must be an integer between ${IntToRomanNumeralQueryParamRange.MIN} and ${IntToRomanNumeralQueryParamRange.MAX} (inclusive).`;
}

export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error.';
