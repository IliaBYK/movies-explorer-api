import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { UNAUTHORIZED_MESSAGE } from '../utils/constants.js';
import config from '../utils/config.js';

export default function auth(req, res, next) {
  try {
    const { cookies } = req;
    const { jwt: token } = cookies;
    if (!token) {
      next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
      return;
    }
    const payload = verify(token, config.JWT_KEY);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
    return;
  }
  next();
}
