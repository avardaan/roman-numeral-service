import express, { Router } from 'express';
import { convertIntToRomanNumeral } from './route-handlers';

// define API routes
enum API_ROUTES {
	INT_TO_ROMAN_NUMERAL = '/romannumeral',
}

// create express router
export const apiRouter: Router = express.Router();

// create GET route
apiRouter.get(API_ROUTES.INT_TO_ROMAN_NUMERAL, convertIntToRomanNumeral);
