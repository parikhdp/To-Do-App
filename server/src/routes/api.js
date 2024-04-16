import express from 'express';
import Register from '../controllers/register.controller.js';
import { registerSchema } from '../validationSchema/registerSchema.js';
const apiRoute = express.Router();

apiRoute.post('/register',registerSchema,Register);



export default apiRoute;