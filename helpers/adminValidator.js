import { check } from "express-validator";

// PERMISSIONS
export const permissionAddValidator = [
    check('permission_name', 'Permission name is required').not().isEmpty(),
];

export const permissionGetValidator = [
    check('id', 'ID of permission required!').not().isEmpty(),
];

export const permissionDeleteValidator = [
    check('id', 'ID of permission required!').not().isEmpty(),
];

export const permissionUpdateValidator = [
    check('id', 'ID of permission required!').not().isEmpty(),
    check('permission_name', 'Permission name is required').not().isEmpty(),
];

// CATEGORIES
export const categoryAddValidator = [
    check('category_name', 'Category name is required').not().isEmpty(),
];

export const categoryDeleteValidator = [
    check('id', 'ID of category required!').not().isEmpty(),
];

export const categoryUpdateValidator = [
    check('id', 'ID of category required!').not().isEmpty(),
    check('category_name', 'Category name is required').not().isEmpty(),
];

// POSTS
export const postCreateValidator = [
    check('title', 'Title is required!').not().isEmpty(),
    check('description', 'Description is required!').not().isEmpty(),
];

export const postDeleteValidator = [
    check('id', 'ID of post required!').not().isEmpty(),
];

export const postUpdateValidator = [
    check('id', 'ID of post required!').not().isEmpty(),
    check('title', 'Title is required!').not().isEmpty(),
    check('description', 'Description is required!').not().isEmpty(),
];