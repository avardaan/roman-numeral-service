// Roman Numeral Converter API

import express, { Express } from 'express';
import { apiRouter } from './api';

// define port for server to bind to
const PORT: number = parseInt(process.env.PORT) || 8080;

// initialize express app
const app: Express = express();

// attach router with handlers
app.use('/', apiRouter);

app.all('*', (req, res) => {
	res.status(404).json({
		error: 'Not Found',
	});
});

// start server and listen for requests
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
