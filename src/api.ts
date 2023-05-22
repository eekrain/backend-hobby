import Express from 'express';
import cors from 'cors';
import AmikomParking from './routes/amikom_parking';
import myLogger from './utils/logger';

export const app = Express();

app.use(cors({ origin: true }));

app.use(Express.json());
app.use(Express.urlencoded());
app.use(Express.raw({ type: 'application/vnd.custom-type' }));
app.use(Express.text({ type: 'text/html' }));
app.use(myLogger);

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

// Amikom Parking router
app.use('/api/amikom_parking', AmikomParking);
