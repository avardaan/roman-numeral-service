import { Request } from 'express';
import { convertIntToRomanNumeral } from './route-handlers';
import { HttpStatusCode } from './utils';

const baseTestRequest = {
	query: {
		query: undefined,
	},
};

const baseMockResponse = {
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
};

const baseErrorResponseBody = ()

describe('convertIntToRomanNumeral', () => {
	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
  message when query param is undefined`, () => {
		convertIntToRomanNumeral(baseTestRequest as any, baseMockResponse as any);
		expect(baseMockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
	});
});
