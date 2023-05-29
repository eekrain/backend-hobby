import { Prisma } from '@prisma/client';
import { seedPrismaClient } from '.';

export const vehicles_amikom_parking = async () => {
  let eka: Prisma.VehicleUncheckedCreateInput = {
    plat: 'AB 1234 CD',
    jenis: 'MOTOR',
    merk: 'YAMAHA',
    tipe: 'N-MAX',
    mhs_nim: '17.11.1768',
  };

  let irfan: Prisma.VehicleUncheckedCreateInput = {
    plat: 'AB 2345 EF',
    jenis: 'MOTOR',
    merk: 'YAMAHA',
    tipe: 'JUPITER MX',
    mhs_nim: '17.11.1738',
  };

  const a = await seedPrismaClient.vehicle.upsert({
    where: { plat: eka.plat },
    update: eka,
    create: eka,
  });

  const b = await seedPrismaClient.vehicle.upsert({
    where: { plat: irfan.plat },
    update: irfan,
    create: irfan,
  });
  console.log({ a, b });
};
