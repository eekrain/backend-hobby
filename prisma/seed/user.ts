import { generatePassword } from '../../src/utils/hash';
import { seedPrismaClient } from '../seed';

export const user = async () => {
  let eka = {
    nim: '17.11.1768',
    nama: 'Ardian Eka Candra',
    pass: '20032'
  };
  let irfan = {
    nim: '17.11.1738',
    nama: 'Irfan Maulana',
    pass: '20032'
  };

  eka.pass = await generatePassword(eka.pass);
  irfan.pass = await generatePassword(irfan.pass);

  const a = await seedPrismaClient.user.upsert({
    where: { nim: eka.nim },
    update: eka,
    create: eka
  });
  const b = await seedPrismaClient.user.upsert({
    where: { nim: irfan.nim },
    update: irfan,
    create: irfan
  });
  console.log({ a, b });
};
