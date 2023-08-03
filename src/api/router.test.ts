import { createServer } from '.';
import { API_ROUTES } from './router';
import request from 'supertest';

const app = createServer();


const getIntegerToRomanNumeralURLWithParam = (int: any) =>
		`${API_ROUTES.INT_TO_ROMAN_NUMERAL}?query=${int}`;

const IntToRomanNumeralTestData = [
  {
    request: {
      url: getIntegerToRomanNumeralURLWithParam(1)
    },
    response: {
      status: 200,
      body: {
        input: '1',
        output: 'I'
      }
    }
  }
];

describe(`GET ${API_ROUTES.INT_TO_ROMAN_NUMERAL}`, () => {
	

	it('should return 200', async () => {
		const response = await request(app).get(getIntegerToRomanNumeralURLWithParam(1));
		expect(response.status).toBe(200);
	});
});
