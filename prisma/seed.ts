import { PrismaClient } from '@prisma/client';
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
  const alice = await prisma.user.upsert({
    where: { nim: '17.11.1768' },
    update: {},
    create: {
      nim: '17.11.1768',
      nama: 'Ardian Eka Candra',
      pass: '20032'
    }
  });
  const bob = await prisma.user.upsert({
    where: { nim: '17.11.1738' },
    update: {},
    create: {
      nim: '17.11.1738',
      nama: 'Irfan Maulana',
      pass: '20032'
    }
  });
  console.log({ alice, bob });
}
