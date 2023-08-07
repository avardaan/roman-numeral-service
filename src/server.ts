import express, { Express } from 'express';
import { apiRouter } from './api/router';
import { HttpStatusCode } from './api/utils';
import logger from './logger';

function createServer(): Express {
	logger.info('Creating HTTP server...');
	// initialize express app
	const app: Express = express();

	// log all requests
	app.use((req, _, next) => {
		logger.info(`Received ${req.method} request for ${req.originalUrl}`);
		next();
	});

	// attach router with handlers
	app.use('/', apiRouter);

	// catch all other routes, respond with 404
	app.all('*', (_, res) => {
		res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Not found.' });
	});

	logger.info('HTTP server created.');
	return app;
}

export default createServer;
