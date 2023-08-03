import express, { Router } from 'express';
import { convertIntToRomanNumeral } from './route-handlers';

enum API_ROUTES {
	INT_TO_ROMAN_NUMERAL = '/romannumeral',
}

export const apiRouter: Router = express.Router();

apiRouter.get(API_ROUTES.INT_TO_ROMAN_NUMERAL, convertIntToRomanNumeral);
