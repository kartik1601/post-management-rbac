import { check } from 'express-validator';

export const registerValidator = [
    check('name','Name is required').not().isEmpty(),
    check('email','Provide valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true,
    }),
    check('password','Password is required').not().isEmpty(),
];