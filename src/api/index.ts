import express, { Express } from 'express';
import { apiRouter } from './router';
import { HttpStatusCode } from '../constants';

export function createServer(): Express {
	// initialize express app
	const app: Express = express();

	// attach router with handlers
	app.use('/', apiRouter);

	// catch all other routes, respond with 404
	app.all('*', (_, res) => {
		res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Not found.' });
	});

	return app;
}
