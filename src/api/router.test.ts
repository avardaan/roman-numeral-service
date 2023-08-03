import { createServer } from '.';
import { HttpStatusCode, getIntToRomanNumeralRouteHandlerErrorMessage } from './utils';
import { API_ROUTES } from './router';
import supertestRequest from 'supertest';

const app = createServer();

const getIntegerToRomanNumeralURLWithParam = (input: any) =>
	`${API_ROUTES.INT_TO_ROMAN_NUMERAL}?query=${input}`;

const IntToRomanNumeralTestData = [
	{
		request: {
			url: getIntegerToRomanNumeralURLWithParam(null),
		},
		response: {
			status: HttpStatusCode.BAD_REQUEST,
			body: {
				error: getIntToRomanNumeralRouteHandlerErrorMessage(null as any),
			},
		},
	},
	{
		request: {
			url: getIntegerToRomanNumeralURLWithParam(undefined),
		},
		response: {
			status: HttpStatusCode.BAD_REQUEST,
			body: {
				error: getIntToRomanNumeralRouteHandlerErrorMessage(undefined as any),
			},
		},
	},
	{
		request: {
			url: getIntegerToRomanNumeralURLWithParam(1),
		},
		response: {
			status: HttpStatusCode.OK,
			body: {
				input: '1',
				output: 'I',
			},
		},
	},
];

describe.only(`GET ${API_ROUTES.INT_TO_ROMAN_NUMERAL}`, () => {
	IntToRomanNumeralTestData.forEach(({ request, response: expectedResponse }) => {
		it(`should return status=${expectedResponse.status} with expected body for request to ${request.url}`, async () => {
			const res = await supertestRequest(app).get(request.url);
			expect(res.status).toBe(expectedResponse.status);
			expect(res.body).toEqual(expectedResponse.body);
		});
	});
});
