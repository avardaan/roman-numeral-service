// Roman Numeral Converter

import express, { type Express, Request, Response } from 'express';
import { RomanNumeralRequestQueryParams, RomanNumeralResponseBody } from './types';
import { intToRoman } from './lib';

// define port for server to bind to
const PORT: number = parseInt(process.env.PORT) || 8080;

// initialize express app
const app: Express = express();

app.get(
	'/romannumeral',
	(req: Request<{}, {}, {}, RomanNumeralRequestQueryParams>, res: Response) => {
		// get query param as string
		const inputIntAsString: string = req.query.query;
		// convert query param to number
		const inputInt: number = parseInt(inputIntAsString, 10);

		const response: RomanNumeralResponseBody = {
			input: inputIntAsString,
			output: intToRoman(inputInt),
		};
		res.json(response);
	}
);

// listen for requests
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
