import { convertIntToRomanNumeral } from './route-handlers';
import {
	HttpStatusCode,
	INTERNAL_SERVER_ERROR_MESSAGE,
	getIntToRomanNumeralRouteHandlerErrorMessage,
} from './utils';
import * as lib from '../lib';

// mock the logger module
jest.mock('../logger');
// mock the intToRomanNumeral function
const intToRomanMockResponse = 'mocked';
const intToRomanNumeralSpy = jest
	.spyOn(lib, 'intToRomanNumeral')
	.mockImplementation(() => intToRomanMockResponse);

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
	beforeEach(() => {
		// reset the mock implementation and call count before each test
		intToRomanNumeralSpy.mockClear();
	});

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
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(0);
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
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(0);
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
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(0);
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
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(0);
	});

	it(`calls res.status() with ${HttpStatusCode.BAD_REQUEST} and res.json() with error \
	message when query param is a string that cannot be parsed to an integer`, () => {
		const input = '22.00';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(getIntToRomanNumeralRouteHandlerErrorMessage(input))
		);
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(0);
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
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(0);
	});

	it(`calls res.status() with ${HttpStatusCode.INTERNAL_SERVER_ERROR} and res.json() with error \
	message when intToRomanNumeral throws an error`, () => {
		const input = '1';
		const testRequest = baseTestRequest(input) as any;
		const mockResponse = baseMockResponse() as any;
		intToRomanNumeralSpy.mockImplementationOnce(() => {
			throw new Error();
		});
		convertIntToRomanNumeral(testRequest, mockResponse);
		expect(mockResponse.status).toHaveBeenCalledTimes(1);
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
		expect(mockResponse.json).toHaveBeenCalledTimes(1);
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseErrorResponseBody(INTERNAL_SERVER_ERROR_MESSAGE)
		);
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(1);
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
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseSuccessResponseBody(input, intToRomanMockResponse)
		);
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(1);
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
		expect(mockResponse.json).toHaveBeenCalledWith(
			baseSuccessResponseBody(input, intToRomanMockResponse)
		);
		expect(intToRomanNumeralSpy).toHaveBeenCalledTimes(1);
	});
});
