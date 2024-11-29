import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator, postCreateValidator, postDeleteValidator, postUpdateValidator } from '../helpers/adminValidator.js';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';
import { createPost, getPosts, deletePost, updatePost } from '../controllers/postController.js';
import { editorAccess } from '../middleware/adminMiddleware.js';

const router = express();

// category CRUD
router.post('/add-category', auth, editorAccess, categoryAddValidator, addCategory);
router.get('/get-categories', auth, getCategories);
router.delete('/delete-category', auth, editorAccess, categoryDeleteValidator, deleteCategory);
router.put('/update-category', auth,  editorAccess, categoryUpdateValidator, updateCategory);

// posts CRUD
router.post('/create-post', auth, postCreateValidator, createPost);
router.get('/get-posts', auth, getPosts);
router.delete('/delete-post', auth, postDeleteValidator, deletePost);
router.put('/update-post', auth, postUpdateValidator, updatePost);

export default router;