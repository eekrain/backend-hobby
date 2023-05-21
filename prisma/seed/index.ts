import { PrismaClient } from '@prisma/client';
import { user_amikom_parking } from './user_amikom_parking';

export const seedPrismaClient = new PrismaClient();

async function main() {
  await user_amikom_parking();
}

main()
  .then(async () => {
    await seedPrismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await seedPrismaClient.$disconnect();
    process.exit(1);
  });
