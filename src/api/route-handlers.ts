import { intToRoman } from '../lib';
import { RomanNumeralRequestQueryParams, RomanNumeralResponseBody } from './types';
import { Request, Response } from 'express';

export function convertIntToRomanNumeral(
	req: Request<{}, {}, {}, RomanNumeralRequestQueryParams>,
	res: Response<RomanNumeralResponseBody>
): void {
	// get query param as string
	const inputIntAsString: string = req.query.query;
	// convert query param to number
	const inputInt: number = parseInt(inputIntAsString, 10);
	// create response object
	const response: RomanNumeralResponseBody = {
		input: inputIntAsString,
		output: intToRoman(inputInt),
	};
	// respond with response object as json
	res.json(response);
}
