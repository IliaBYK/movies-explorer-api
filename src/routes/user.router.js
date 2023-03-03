import { Router } from 'express';
import { getMe, updateMe } from '../controllers/userController.js';
import { userValidationMe } from '../middlewares/validation.js';

const router = Router();

router.get('', getMe);
router.patch('', userValidationMe, updateMe);

export default router;
