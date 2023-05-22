import Express from 'express';
import userRouter from './user';
import webRouter from './web';
import parkingRouter from './parking';

const AmikomParking = Express.Router();

AmikomParking.use('/user', userRouter);
AmikomParking.use('/web', webRouter);
AmikomParking.use('/parking', parkingRouter);

export default AmikomParking;
