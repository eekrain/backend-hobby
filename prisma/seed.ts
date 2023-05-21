import { PrismaClient } from '@prisma/client';
import { generatePassword } from '../src/utils/hash';

const prisma = new PrismaClient();

async function main() {
  await user();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function user() {
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

  const a = await prisma.user.upsert({
    where: { nim: eka.nim },
    update: eka,
    create: eka
  });
  const b = await prisma.user.upsert({
    where: { nim: irfan.nim },
    update: irfan,
    create: irfan
  });
  console.log({ a, b });
}
