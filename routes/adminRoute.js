import express from 'express';
import { permissionAddValidator, permissionGetValidator, permissionDeleteValidator, permissionUpdateValidator } from '../helpers/adminValidator.js';
import { addPermission, getPermission, getPermissionById, deletePermission, updatePermission } from '../controllers/admin/permissionController.js';
import auth from '../middleware/authMiddleware.js'
import { adminAccess } from '../middleware/adminMiddleware.js';

const router = express();

// permission routes
router.post('/add-permission', auth, adminAccess, permissionAddValidator, addPermission);
router.get('/get-permissions', auth, adminAccess, getPermission);
router.get('/get-permission-id', auth, adminAccess, permissionGetValidator, getPermissionById);
router.delete('/delete-permission', auth, adminAccess, permissionDeleteValidator, deletePermission);
router.put('/update-permission', auth, adminAccess, permissionUpdateValidator, updatePermission);

export default router;