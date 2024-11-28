import { check } from "express-validator";

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