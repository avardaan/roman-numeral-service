import winston from 'winston';

const logger: winston.Logger = winston.createLogger({
	level: 'info',
	transports: [
		// console transport
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
		// file transport
		// new winston.transports.File({
		// 	filename: 'logs/combined.log',
		// 	level: 'info',
		// 	format: winston.format.json(),
		// }),
	],
});

export default logger;
