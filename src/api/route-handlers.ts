import { intToRoman } from '../lib';
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
	if (
		isNaN(inputInt) ||
		inputInt < RomanNumeralIntInputConstraints.MIN ||
		inputInt > RomanNumeralIntInputConstraints.MAX
	) {
		const errorResponse: RomanNumeralErrorResponseBody = {
			error: 'Invalid input. Input must be an integer between 1 and 255.',
		};
		// bad request
		res.status(400).json(errorResponse);
		return;
	}
	// create response object
	const response: RomanNumeralSuccessResponseBody = {
		input: inputIntAsString,
		output: intToRoman(inputInt),
	};
	// send json response
	res.json(response);
}
