import { Router } from 'express';
import { signin, signup, logout } from '../controllers/auth.controller.js';
import { signinValidation, signupValidation } from '../middlewares/validation.js';

const router = Router();

router.post('/signin', signupValidation, signin);

router.post('/signup', signinValidation, signup);

router.post('/signout', logout);

export default router;
