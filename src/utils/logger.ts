import expressWinston from 'express-winston';
import { transports, format } from 'winston';

const myLogger = expressWinston.logger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint(),
    format.colorize(),
  ),
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

export default myLogger;
