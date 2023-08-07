// Roman Numeral Converter API
import { Express } from 'express';
import { createServer } from './api';

// define port for server to bind to
const PORT: number = parseInt(process.env.PORT) || 8080;

// create http server using express
const app: Express = createServer();

// start server and listen for requests
app.listen(PORT, () => {
	console.log(`HTTP server listening...`);
});
