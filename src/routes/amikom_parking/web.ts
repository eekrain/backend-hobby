import Express from 'express';
import { PrismaClient } from '@prisma/client';
import { TypedRequestBody } from '../../types';
import { verifyPassword } from '../../utils/hash';
import MY_ERRORS from '../../utils/errors';

const prisma = new PrismaClient();
const webRouter = Express.Router();

webRouter.post(
  '/auth',
  async (
    req: TypedRequestBody<{ username: string; password: string }>,
    res
  ) => {
    const { username, password } = req.body;
    if (typeof username !== 'string' && typeof password !== 'string') {
      return MY_ERRORS.BAD_REQUEST_400(res);
    }

    const passwordCorrect =
      username === process.env.WEB_ADMIN_USERNAME &&
      password === process.env.WEB_ADMIN_PASSWORD;

    if (passwordCorrect) {
      return res.status(200).send({
        status: true,
        message: 'Successfully Log In!'
      });
    }

    console.error('Log In failed, wrong password');
    return MY_ERRORS.UNAUTHORIZED_401(res);
  }
);

export default webRouter;
