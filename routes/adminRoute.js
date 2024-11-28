import express from 'express';
import { permissionAddValidator, permissionGetValidator, permissionDeleteValidator, permissionUpdateValidator } from '../helpers/adminValidator.js';
import { addPermission, getPermission, getPermissionById, deletePermission, updatePermission } from '../controllers/admin/permissionController.js';
import auth from '../middleware/authMiddleware.js'

const router = express();

// permission routes
router.post('/add-permission', auth, permissionAddValidator, addPermission);
router.get('/get-permissions', auth, getPermission);
router.get('/get-permission-id', auth, permissionGetValidator, getPermissionById);
router.delete('/delete-permission', auth, permissionDeleteValidator, deletePermission);
router.put('/update-permission', auth, permissionUpdateValidator, updatePermission);

export default router;