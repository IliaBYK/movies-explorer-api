// eslint-disable-next-line import/no-extraneous-dependencies
import bundle from 'bcryptjs';
import pkg from 'jsonwebtoken';
import User from '../models/user.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { WRONG_DATA_MESSAGE } from '../utils/constants.js';
import { OK_CODE_STATUS, CREATED_CODE } from '../utils/errorsCodes.js';

const { hash, compare } = bundle;
const { sign } = pkg;

export async function signup(req, res, next) {
  try {
    const { name } = req.body;
    let { email, password } = req.body;
    email = email.toLowerCase();
    password = await hash(password, 10);
    let user = await User.create({
      name, email, password,
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

    const token = sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .status(OK_CODE_STATUS)
      .send({
        user,
      })
      .end();
  } catch (err) {
    next(err);
  }
}
