import Express from 'express';
import userRouter from './user';
import webRouter from './web';

const AmikomParking = Express.Router();

AmikomParking.use('/user', userRouter);
AmikomParking.use('/web', webRouter);

export default AmikomParking;
