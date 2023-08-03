export interface RomanNumeralRequestQueryParams {
	query: string;
}

export interface RomanNumeralSuccessResponseBody {
	input: string;
	output: string;
}

export interface RomanNumeralErrorResponseBody {
	error: string;
}

export type RomanNumeralResponseBody =
	| RomanNumeralSuccessResponseBody
	| RomanNumeralErrorResponseBody;
