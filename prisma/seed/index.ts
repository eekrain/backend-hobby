import { PrismaClient } from '@prisma/client';
import { user_amikom_parking } from './user_amikom_parking';
import { vehicles_amikom_parking } from './vehicles_amikom_parking';
import { reset_history } from './user_amikom_parking copy';

export const seedPrismaClient = new PrismaClient();

async function main() {
  await user_amikom_parking();
  await vehicles_amikom_parking();
  await reset_history();
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
