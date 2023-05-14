import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const AmikomParking = express.Router();

AmikomParking.get('/hello', async (req, res) => {
  const tes = await prisma.user.findMany();
  console.log('🚀 ~ file: api.ts:25 ~ api.get ~ tes:', tes);
  res.status(200).send({ message: 'hello world' });
});

AmikomParking.get('/create', async (req, res) => {
  const tes = await prisma.user.create({
    data: {
      nama: 'Ardian Eka Candra',
      nim: '17.11.1768',
      pass: '20032'
    }
  });
  console.log('🚀 ~ file: api.ts:25 ~ api.get ~ tes:', tes);
  res.status(200).send({ message: 'creating' });
});

export default AmikomParking;
