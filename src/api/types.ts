export interface RomanNumeralRequestQueryParams {
	query: string;
}

export interface RomanNumeralSuccessResponseBody {
	input: string;
	output: string;
}

export interface ErrorResponseBody {
	error: string;
}

export type RomanNumeralResponseBody =
	| RomanNumeralSuccessResponseBody
	| ErrorResponseBody;
