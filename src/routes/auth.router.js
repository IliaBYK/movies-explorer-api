import { Router } from 'express';
import { signin, signup, signout } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.js';
import { signinValidation, signupValidation } from '../middlewares/validation.js';

const router = Router();

router.post('/signup', signupValidation, signup);

router.post('/signin', signinValidation, signin);

router.post('/signout', auth, signout);

export default router;
