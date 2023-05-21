import type Express from 'express';

const UNAUTHORIZED_401 = (
  res: Express.Response,
  message = 'Credentials not found!'
) => {
  return res.status(401).send(message);
};

const BAD_REQUEST_400 = (
  res: Express.Response,
  message = 'Request information sent is not accepted!'
) => {
  return res.status(400).send(message);
};

const MY_ERRORS = { UNAUTHORIZED_401, BAD_REQUEST_400 };

export default MY_ERRORS;
