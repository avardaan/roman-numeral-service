// Roman Numeral Converter API
import express, { Express } from 'express';
import { apiRouter } from './api';

// define port for server to bind to
const PORT: number = parseInt(process.env.PORT) || 8080;

// initialize express app
const app: Express = express();

// attach router with handlers
app.use('/', apiRouter);

// catch all other routes, respond with 404
app.all('*', (_, res) => {
	res.status(404).send('404 Not Found');
});

// start server and listen for requests
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
