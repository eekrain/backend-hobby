import { PrismaClient } from '@prisma/client';
import { user } from './user';

export const seedPrismaClient = new PrismaClient();

async function main() {
  await user();
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
