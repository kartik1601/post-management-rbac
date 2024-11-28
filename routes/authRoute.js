import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../helpers/validator.js';
import auth from '../middleware/authMiddleware.js';

const router = express();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.get('/profile', auth, getProfile);

export default router;