import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { UNAUTHORIZED_MESSAGE } from '../utils/constants.js';
import config from '../utils/config.js';

export default function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    if (!authorization) {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
    }
    const payload = verify(token, config.JWT_KEY);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
    return;
  }
  next();
}
