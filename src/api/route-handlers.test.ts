import { convertIntToRomanNumeral } from './route-handlers';
import { HttpStatusCode, getIntToRomanNumeralRouteHandlerErrorMessage } from './utils';

// mock the logger module
jest.mock('../logger');

/**
 * TODO: Add a mock for the lib module to mock the intToRomanNumeral function, spy on it, and
 * assert that it is not called for the error cases, and it is called with the expected arguments for the success cases.
 */

const baseTestRequest = (inputInteger?: string) => ({
	query: {
		query: inputInteger,
	},
});

const baseMockResponse = () => ({
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
});

const baseSuccessResponseBody = (inputInt: string, outputRomanNumeral: string) => ({
	input: inputInt,
	output: outputRomanNumeral,
});

const baseErrorResponseBody = (errorMessage: string) => ({
	error: errorMessage,
});

describe('convertIntToRomanNumeral', () => {
	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
  message when query param is undefined`, () => {
		const input = undefined as any;
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(getIntToRomanNumeralRouteHandlerErrorMessage(input))
		);
	});

	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
	message when query param is null`, () => {
		const input = null as any;
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(getIntToRomanNumeralRouteHandlerErrorMessage(input))
		);
	});

	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
	message when query param is an empty string`, () => {
		const input = '';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(getIntToRomanNumeralRouteHandlerErrorMessage(input))
		);
	});

	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
	message when query param is a string that cannot be parsed to an integer`, () => {
		const input = 'abc';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(getIntToRomanNumeralRouteHandlerErrorMessage(input))
		);
	});

	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
	message when query param is a string that can be parsed to an integer but is not a \
	positive integer`, () => {
		const input = '-1';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(getIntToRomanNumeralRouteHandlerErrorMessage(input))
		);
	});

	it(`calls res.status() with ${HttpStatusCode.OK} and res.json() with the correct \
	response body when query param is a string that can be parsed to an integer and is a \
	positive integer`, () => {
		const input = '1';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(baseSuccessResponseBody(input, 'I'));
	});

	it(`calls res.status() with ${HttpStatusCode.OK} and res.json() with the correct \
	response body when query param is a string that can be parsed to an integer and is a \
	positive integer`, () => {
		const input = '3999';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(baseSuccessResponseBody(input, 'MMMCMXCIX'));
	});
});
