import { check } from "express-validator";

export const permissionAddValidator = [
    check('permission_name', 'Permission name is required').not().isEmpty(),
];