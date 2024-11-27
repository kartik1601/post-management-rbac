import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../helpers/validator.js';

const router = express();

router.post('/register',registerValidator, registerUser);
router.post('/login',loginValidator, loginUser);

export default router;