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

  res.status(200).send({
    status: true,
    message: 'Akses diterima. Hati-hati di jalan!',
    plat: plat,
    jenis: 'MOTOR',
    merk: 'YAMAHA',
    tipe: 'N-Max',
    mhs_nama: 'Ardian Eka Candra',
    mhs_foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  });
});

export default parkingRouter;
