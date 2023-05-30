import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { promisify } from 'node:util';

const getRandomBytes = promisify(randomBytes);

export const generatePassword = async (password: string) => {
  const salt = await getRandomBytes(32);
  const hashedPassword = await argon2.hash(password, {});
  return hashedPassword;
};

export const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string,
) => {
  const isCorrect = await argon2.verify(hashedPassword, inputPassword);
  return isCorrect;
};
