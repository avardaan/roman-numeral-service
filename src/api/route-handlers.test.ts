import { convertIntToRomanNumeral } from './route-handlers';
import { HttpStatusCode } from './utils';

jest.mock('../logger');

const baseTestRequest = (inputInteger?: String) => ({
	query: {
		query: inputInteger,
	},
});

const baseMockResponse = () => ({
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
});

describe('convertIntToRomanNumeral', () => {
	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
  message when query param is undefined`, () => {
		const testRequest = baseTestRequest(undefined) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
	});
});
