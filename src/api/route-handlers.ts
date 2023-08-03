import { HttpStatusCode } from '../constants';
import { intToRomanNumeral } from '../lib';
import { RomanNumeralIntInputConstraints } from './constants';
import {
	RomanNumeralErrorResponseBody,
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
	// get query param as string, with optional chaining
	const inputIntAsString: string = req.query?.query;
	// convert query param to integer for validation and further processing
	const inputInt: number = parseInt(inputIntAsString, 10);
	// validate input
	const isInputValid: boolean =
		Number.isInteger(inputInt) &&
		inputInt >= RomanNumeralIntInputConstraints.MIN &&
		inputInt <= RomanNumeralIntInputConstraints.MAX;

	if (!isInputValid) {
		const badRequestResponseBody: RomanNumeralErrorResponseBody = {
			error: `Invalid param [query=${inputIntAsString}] - must be an integer between ${RomanNumeralIntInputConstraints.MIN} and ${RomanNumeralIntInputConstraints.MAX} (inclusive).`,
		};
		// bad request, exit early
		res.status(HttpStatusCode.BAD_REQUEST).json(badRequestResponseBody);
		return;
	}

	let romanNumeralOutput: string;
	try {
		// attempt int to roman conversion
		romanNumeralOutput = intToRomanNumeral(inputInt);
	} catch (err) {
		// internal server error, exit early
		const serverErrorResponseBody: RomanNumeralErrorResponseBody = {
			error: 'Internal server error.',
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
