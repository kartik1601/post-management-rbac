import express from 'express';
import { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator } from '../helpers/adminValidator.js';
import auth from '../middleware/authMiddleware.js';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';
import { editorAccess } from '../middleware/adminMiddleware.js';

const router = express();

// category routes
router.post('/add-category', auth, editorAccess, categoryAddValidator, addCategory);
router.get('/get-categories', auth, getCategories);
router.delete('/delete-category', auth, editorAccess, categoryDeleteValidator, deleteCategory);
router.put('/update-category', auth,  editorAccess, categoryUpdateValidator, updateCategory);

export default router;