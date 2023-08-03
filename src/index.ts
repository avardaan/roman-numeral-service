// Roman Numeral Converter

import express, { type Express, Request, Response } from 'express';
import { RomanNumeralRequestQueryParams, RomanNumeralResponseBody } from './types';

// express app
const app: Express = express();

app.get(
	'/romannumeral',
	(req: Request<{}, {}, {}, RomanNumeralRequestQueryParams>, res: Response) => {
		// get query param as string
		const arabicNumberAsString: string = req.query.query;
		// convert query param to number
		// const arabicNumber: number = parseInt(arabicNumberAsString, 10);

		const response: RomanNumeralResponseBody = {
			input: arabicNumberAsString,
			output: 'I',
		};

		res.json(response);
	}
);

// listen for requests
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
