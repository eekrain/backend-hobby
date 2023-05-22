import Express from 'express';
import { PrismaClient } from '@prisma/client';
import MY_ERRORS from '../../utils/errors';
import dayjs from 'dayjs';

const prisma = new PrismaClient();
const parkingRouter = Express.Router();
const WEB_ADMIN_QRKEY = process.env.WEB_ADMIN_QRKEY;

parkingRouter.post('/processParking', async (req, res: Express.Response) => {
  const { nim, plat, qrcode } = req.body;
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
    message: 'Akses diterima. Hati-hati di jalan!',
    plat: currVehicle.plat,
    jenis: currVehicle.jenis,
    merk: currVehicle.merk,
    tipe: currVehicle.tipe,
    mhs_nama: user.nama,
    mhs_foto: user.foto,
  });
});

export default parkingRouter;
