import express from 'express';
import { permissionAddValidator } from '../helpers/adminValidator.js';
import { addPermission } from '../controllers/admin/permissionController.js' ;

const router = express();

router.post('/add-permission', permissionAddValidator, addPermission);

export default router;