import Express from 'express';
import { PrismaClient } from '@prisma/client';
import { TypedRequestBody } from '../types';
import { verifyPassword } from '../utils/hash';

const prisma = new PrismaClient();
const AmikomParking = Express.Router();

AmikomParking.post(
  '/auth',
  async (req: TypedRequestBody<{ nim: string; pass: string }>, res) => {
    const { nim, pass } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        nim
      }
    });

    if (!user) {
      console.error('Log In failed, user not found');
      return res.status(401).send({
        status: false,
        message: 'Gagal Log In!'
      });
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
    return res.status(401).send({
      status: false,
      message: 'Gagal Log In!'
    });
  }
);

AmikomParking.get('/listUser', async (req, res: Express.Response) => {
  const tes = await prisma.user.findMany();
  console.log('🚀 ~ file: api.ts:25 ~ api.get ~ tes:', tes);
  res.status(200).send({ message: 'hello world' });
});

export default AmikomParking;
