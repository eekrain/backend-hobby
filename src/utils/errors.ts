import type Express from 'express';

const UNAUTHORIZED_401 = (
  res: Express.Response,
  payload = {
    status: false,
    message: 'Gagal Log In!'
  }
) => {
  return res.status(401).send(payload);
};

const BAD_REQUEST_400 = (
  res: Express.Response,
  payload = {
    message: 'Request information sent is not accepted'
  }
) => {
  return res.status(400).send(payload);
};

const MY_ERRORS = { UNAUTHORIZED_401, BAD_REQUEST_400 };

export default MY_ERRORS;
