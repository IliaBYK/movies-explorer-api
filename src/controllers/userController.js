import userSchema from '../models/user.js';
import { NOT_FOUND_USER_MESSAGE } from '../utils/constants.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function getMe(req, res, next) {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    const { name, email } = req.body;
    const user = await userSchema.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true,
      runValidators: true,
    });
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}
