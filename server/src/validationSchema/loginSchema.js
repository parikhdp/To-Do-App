import { check } from 'express-validator';

export const loginSchema = [
    check('username', 'username is required')
        .exists()
        .matches(/^[a-zA-Z0-9_]+$/) //allow alphanumeric characters and underscores
        .withMessage('username must be alphanumeric with underscores')
        .isLength({ min: 6, max: 32 })
        .withMessage('username must be at least 6 characters long and at most 32 characters long'),
        check('password', 'password is required').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
];
