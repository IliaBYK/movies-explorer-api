import bundle from 'bcryptjs';
import pkg from 'jsonwebtoken';
import User from '../models/user.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { WRONG_DATA_MESSAGE } from '../utils/constants.js';
import config from '../utils/config.js';
import { OK_CODE_STATUS, CREATED_CODE, ACCEPTED_CODE } from '../utils/errorsCodes.js';

const { hash, compare } = bundle;
const { sign } = pkg;

export async function signup(req, res, next) {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    password = await hash(password, 10);
    let user = await User.create({
      name: req.body.name, email, password,
    });
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    res.status(CREATED_CODE).send(user);
  } catch (err) {
    next(err);
  }
}

export async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select('+password');

    if (user === null || !(await compare(password, user.password))) {
      throw new UnauthorizedError(WRONG_DATA_MESSAGE);
    }

    const token = sign({ _id: user._id }, config.JWT_KEY, { expiresIn: '7d' });
    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .status(OK_CODE_STATUS)
      .send({ user });
  } catch (err) {
    next(err);
  }
}

export const logout = async (req, res, next) => {
  try {
    res.status(ACCEPTED_CODE).clearCookie('jwt').redirect('/signin');
  } catch (err) {
    next(err);
  }
};
