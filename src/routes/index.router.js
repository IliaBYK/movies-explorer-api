import { Router } from 'express';
import movieRouter from './movie.router.js';
import userRouter from './user.router.js';
import authRouter from './auth.router.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';
import { NOT_FOUND_PAGE_MESSAGE } from '../utils/constants.js';

const router = Router();

router.use('', authRouter);
router.use(auth);
router.use('/users/me', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_PAGE_MESSAGE)));

export default router;
