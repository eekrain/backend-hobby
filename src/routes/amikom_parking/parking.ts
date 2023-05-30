import Express from 'express';
import { PrismaClient } from '@prisma/client';
import MY_ERRORS from '../../utils/errors';
import { mySocket } from '../..';
const prisma = new PrismaClient();
const parkingRouter = Express.Router();
const WEB_ADMIN_QRKEY = process.env.WEB_ADMIN_QRKEY;

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

parkingRouter.post('/checkQR', async (req, res: Express.Response) => {
  const { nim, plat, qrcode } = req.body as {
    nim: string;
    plat: string;
    qrcode: string;
  };
  const { key, validUntil } = JSON.parse(qrcode);

  if (
    typeof nim !== 'string' &&
    typeof plat !== 'string' &&
    typeof qrcode !== 'string' &&
    typeof key !== 'string' &&
    typeof validUntil !== 'string'
  ) {
    return MY_ERRORS.BAD_REQUEST_400(res);
  }

  if (key !== WEB_ADMIN_QRKEY) {
    return MY_ERRORS.UNAUTHORIZED_401(
      res,
      'QR Key tidak ter-registrasi. Mohon kontak teknisi untuk pengecekan.',
    );
  }

  const isQRActive = dayjs(validUntil).diff(dayjs(), 'second') > 0;
  if (!isQRActive) {
    return MY_ERRORS.UNAUTHORIZED_401(
      res,
      'QR Key sudah tidak valid. Mohon tunggu QR Code selanjutnya.',
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      nim,
    },
    include: {
      vehicles: true,
    },
  });
  const currVehicle = user?.vehicles.find((val) => val.plat === plat);

  if (!user) {
    return MY_ERRORS.UNAUTHORIZED_401(
      res,
      `User dengan nim ${nim} tidak terdaftar. Mohon logout dan login kembali!`,
    );
  }
  if (!currVehicle) {
    return MY_ERRORS.UNAUTHORIZED_401(
      res,
      `Motor dengan plat ${plat} tidak terdaftar. Mohon restart aplikasi untuk sinkronisasi!`,
    );
  }

  res.status(200).send({
    status: true,
    message: 'QR valid.',
    plat: currVehicle.plat,
    jenis: currVehicle.jenis,
    merk: currVehicle.merk,
    tipe: currVehicle.tipe,
    mhs_nama: user.nama,
    mhs_foto: user.foto,
  });
});

parkingRouter.post('/processParking', async (req, res: Express.Response) => {
  const { nim, plat, status, date } = req.body as {
    nim: string;
    plat: string;
    status: string;
    date: string;
  };

  if (
    typeof nim !== 'string' &&
    typeof plat !== 'string' &&
    typeof status !== 'string' &&
    typeof date !== 'string'
  ) {
    mySocket.io.emit('parking-status', {
      status: false,
      message: 'Error fetching.',
    });
    return MY_ERRORS.BAD_REQUEST_400(res);
  }
  console.log('🚀 ~ file: parking.ts:97 ~ parkingRouter.post ~ date:', date);

  if (status !== '1') {
    mySocket.io.emit('parking-status', {
      status: false,
      message: 'Request parkir ditolak!',
    });
    return MY_ERRORS.UNAUTHORIZED_401(res, 'Request parkir ditolak!');
  }

  await prisma.history.create({
    data: {
      mhs_nim: nim,
      plat,
      date: dayjs(date).tz('Asia/Jakarta').toDate(),
    },
  });

  mySocket.io.emit('parking-status', {
    status: true,
    message: 'Akses diterima. Hati-hati di jalan!',
  });

  res.status(200).send({
    status: true,
    message: 'Akses diterima. Hati-hati di jalan!',
  });
});

parkingRouter.get('/history', async (req, res: Express.Response) => {
  let { limit } = req.query as { limit?: 'all' | '1d' };
  if (!limit) limit = 'all';
  if (limit != 'all' && limit != '1d') return MY_ERRORS.BAD_REQUEST_400(res);

  const history = await prisma.history.findMany({
    orderBy: {
      date: 'asc',
    },
    where: {
      date: {
        gte:
          limit === '1d'
            ? dayjs().tz('Asia/Jakarta').startOf('day').toDate()
            : undefined,
      },
    },
  });

  res.status(200).send(history);
});

export default parkingRouter;
