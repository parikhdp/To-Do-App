import { check } from 'express-validator';

/*defining an array of middleware functions using the express-validator library. 
Each element in the array is a middleware function responsible for validating a specific aspect of the incoming request body.*/


export const registerSchema = [
    check('name')
        .trim()
        .matches(/^[a-zA-Z\s]+$/) //only alphabetic characters and spaces
        .withMessage('Name must contain only alphabetic characters and spaces'),
    check('email', 'email is required').exists().trim().isEmail().withMessage('Invalid email'),
    check('password', 'password is required').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
    check('username', 'username is required')
        .exists()
        .matches(/^[a-zA-Z0-9_]+$/) //allow alphanumeric characters and underscores
        .withMessage('username must be alphanumeric with underscores')
        .isLength({ min: 6, max: 32 })
        .withMessage('username must be at least 6 characters long and at most 32 characters long'),
];