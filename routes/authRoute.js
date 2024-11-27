import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { registerValidator } from '../helpers/validator.js';

const router = express();

router.post('/register',registerValidator, registerUser)

export default router;