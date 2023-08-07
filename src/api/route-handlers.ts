import { INT_TO_ROMAN_BASE_MAP, intToRomanNumeral } from '../lib';
import {
	INTERNAL_SERVER_ERROR_MESSAGE,
	IntToRomanNumeralQueryParamRange,
	getIntToRomanNumeralRouteHandlerErrorMessage,
	HttpStatusCode,
} from './utils';
import {
	ErrorResponseBody,
	RomanNumeralRequestQueryParams,
	RomanNumeralResponseBody,
	RomanNumeralSuccessResponseBody,
} from './types';
import { Request, Response } from 'express';

// define route handler
export function convertIntToRomanNumeral(
	req: Request<{}, {}, {}, RomanNumeralRequestQueryParams>,
	res: Response<RomanNumeralResponseBody>
): void {
	// get query param as string, defensively with optional chaining
	const inputIntAsString: string = req.query?.query;
	// convert query param to integer for validation and further processing
	const inputInt: number = parseInt(inputIntAsString, 10);
	// validate input
	const isInputValid: boolean =
		Number.isInteger(inputInt) &&
		inputInt >= IntToRomanNumeralQueryParamRange.MIN &&
		inputInt <= IntToRomanNumeralQueryParamRange.MAX;

	if (!isInputValid) {
		const badRequestResponseBody: ErrorResponseBody = {
			error: getIntToRomanNumeralRouteHandlerErrorMessage(inputIntAsString),
		};
		// bad request, exit early
		res.status(HttpStatusCode.BAD_REQUEST).json(badRequestResponseBody);
		return;
	}

	let romanNumeralOutput: string;
	try {
		// attempt int to roman conversion
		romanNumeralOutput = intToRomanNumeral(inputInt, INT_TO_ROMAN_BASE_MAP);
	} catch (err) {
		// internal server error, exit early
		const serverErrorResponseBody: ErrorResponseBody = {
			error: INTERNAL_SERVER_ERROR_MESSAGE,
		};
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serverErrorResponseBody);
		return;
	}
	// create response object
	const response: RomanNumeralSuccessResponseBody = {
		input: inputIntAsString,
		output: romanNumeralOutput,
	};
	// send json response
	res.status(HttpStatusCode.OK).json(response);
}
