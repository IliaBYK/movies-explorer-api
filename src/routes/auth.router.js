import { Router } from 'express';
import { signin, signup, logout } from '../controllers/auth.controller.js';
import { signinValidation, signupValidation } from '../middlewares/validation.js';

const router = Router();

router.post('/signin', signinValidation, signin);

router.post('/signup', signupValidation, signup);

router.post('/signout', logout);

export default router;
