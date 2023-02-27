import { Router } from 'express';
import { signin, signup, logout } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.js';
import { signinValidation, signupValidation } from '../middlewares/validation.js';

const router = Router();

router.post('/signup', signupValidation, signup);

router.post('/signin', signinValidation, signin);

router.post('/signout', auth, logout);

export default router;
