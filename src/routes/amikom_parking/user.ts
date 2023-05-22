import Express from 'express';
import { PrismaClient } from '@prisma/client';
import { TypedRequestBody } from '../../types';
import { verifyPassword } from '../../utils/hash';
import MY_ERRORS from '../../utils/errors';

const prisma = new PrismaClient();
const userRouter = Express.Router();

userRouter.post(
  '/auth',
  async (req: TypedRequestBody<{ nim: string; pass: string }>, res) => {
    const { nim, pass } = req.body;
    if (typeof nim !== 'string' && typeof pass !== 'string') {
      return MY_ERRORS.BAD_REQUEST_400(res);
    }
    const user = await prisma.user.findFirst({
      where: {
        nim
      }
    });

    if (!user) {
      console.error('Log In failed, user not found');
      return MY_ERRORS.UNAUTHORIZED_401(res);
    }
    const passwordCorrect = await verifyPassword(user.pass, pass);

    if (passwordCorrect) {
      return res.status(200).send({
        status: true,
        message: 'Berhasil Log In!',
        nama: user.nama
      });
    }

    console.error('Log In failed, wrong password');
    return MY_ERRORS.UNAUTHORIZED_401(res);
  }
);

userRouter.post('/getVehicles', async (req, res: Express.Response) => {
  const { nim } = req.body;

  if (typeof nim !== 'string') {
    return MY_ERRORS.BAD_REQUEST_400(res);
  }

  const vehicles = await prisma.vehicle.findMany({ where: { userNim: nim } });
  res.status(200).send(vehicles);
});

userRouter.get('/listUser', async (req, res: Express.Response) => {
  const users = await prisma.user.findMany();
  console.log(
    '🚀 ~ file: amikom_parking.ts:55 ~ AmikomParking.get ~ users:',
    users
  );
  res.status(200).send(users);
});

export default userRouter;
