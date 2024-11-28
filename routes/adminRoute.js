import express from 'express';
import { permissionAddValidator } from '../helpers/adminValidator.js';
import { addPermission } from '../controllers/admin/permissionController.js';
import auth from '../middleware/authMiddleware.js'

const router = express();

router.post('/add-permission', auth, permissionAddValidator, addPermission);

export default router;