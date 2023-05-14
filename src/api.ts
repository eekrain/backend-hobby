import express from 'express';
import cors from 'cors';
import AmikomParking from './routes/amikom_parking';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

// Amikom Parking router
app.use('/api/amikom_parking', AmikomParking);
