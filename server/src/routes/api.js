import express from 'express';
import Register from '../controllers/register.controller.js';
import { registerSchema } from '../validationSchema/registerSchema.js';
import { loginSchema } from '../validationSchema/loginSchema.js';
import Login from '../controllers/login.controller.js';
import { createTodo } from '../controllers/todo.controller.js';
import { check } from 'express-validator';
import { GetTodos } from '../controllers/FetchtodoList.controller.js';
import { MarkTodo } from '../controllers/MarkTodoController.js';
import { RemoveTodo } from '../controllers/Removetodo.controller.js';


const apiRoute = express.Router();
export const apiProtectedRoute = express.Router();

apiRoute.post('/register',registerSchema,Register);
apiRoute.post('/login',loginSchema,Login);

//protected routes
apiProtectedRoute.post('/createTodo',[check('desc','Todo description is required').exists().isLength({min:1}),createTodo]);
apiProtectedRoute.get('/todoList',GetTodos);
apiProtectedRoute.put('/markTodo',[check('todo_id','Todo ID is required').exists().isLength({min:1}),MarkTodo]);
apiProtectedRoute.delete('/deleteTodo',[check('todo_id','Todo ID is required').exists().isLength({min:1}),RemoveTodo]);


export default apiRoute;