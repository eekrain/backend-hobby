import { argon2i } from 'argon2-ffi';
import { randomBytes } from 'crypto';
import { promisify } from 'node:util';

const getRandomBytes = promisify(randomBytes);

export const generatePassword = async (password: string) => {
  const salt = await getRandomBytes(32);
  const hashedPassword = await argon2i.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string
) => {
  const isCorrect = await argon2i.verify(hashedPassword, inputPassword);
  return isCorrect;
};
