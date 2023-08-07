// Roman Numeral Converter API
import { Express } from 'express';
import { createServer } from './server';
import logger from './logger';

// define port for server to bind to
const PORT = process.env.PORT || 8080;

// create http server using express
const app: Express = createServer();

// start server and listen for requests
app.listen(PORT, () => {
	logger.info('HTTP server listening...');
});
