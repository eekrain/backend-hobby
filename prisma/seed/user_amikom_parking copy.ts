import { seedPrismaClient } from '.';
import { generatePassword } from '../../src/utils/hash';

export const reset_history = async () => {
  const del = await seedPrismaClient.history.deleteMany({
    where: { id: { lte: 100 } },
  });
  console.log(del);
};
