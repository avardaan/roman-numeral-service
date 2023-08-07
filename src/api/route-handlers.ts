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
import { parseStrictInteger } from '../lib/utils';
import logger from '../logger';

// define route handler
export function convertIntToRomanNumeral(
	req: Request<{}, {}, {}, RomanNumeralRequestQueryParams>,
	res: Response<RomanNumeralResponseBody>
): void {
	// get query param as string, defensively with optional chaining
	const inputIntAsString: string = req.query?.query;
	// convert query param to integer for validation and further processing
	const parsedInputInt: number = parseStrictInteger(inputIntAsString);
	// validate input
	const isInputValid: boolean =
		!isNaN(parsedInputInt) &&
		parsedInputInt >= IntToRomanNumeralQueryParamRange.MIN &&
		parsedInputInt <= IntToRomanNumeralQueryParamRange.MAX;

	if (!isInputValid) {
		const badRequestResponseBody: ErrorResponseBody = {
			error: getIntToRomanNumeralRouteHandlerErrorMessage(inputIntAsString),
		};
		// bad request, exit early
		res.status(HttpStatusCode.BAD_REQUEST).json(badRequestResponseBody);
		logger.info(`Bad request: query = ${inputIntAsString}`);
		return;
	}

	let romanNumeralOutput: string;
	try {
		// attempt int to roman conversion
		romanNumeralOutput = intToRomanNumeral(parsedInputInt, INT_TO_ROMAN_BASE_MAP);
	} catch (err) {
		// internal server error, exit early
		const serverErrorResponseBody: ErrorResponseBody = {
			error: INTERNAL_SERVER_ERROR_MESSAGE,
		};
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(serverErrorResponseBody);
		logger.error(err);
		return;
	}
	// create response object
	const response: RomanNumeralSuccessResponseBody = {
		input: inputIntAsString,
		output: romanNumeralOutput,
	};
	// send json response
	res.status(HttpStatusCode.OK).json(response);
	logger.info(`Success: query = ${inputIntAsString}, result = ${romanNumeralOutput}`);
}
