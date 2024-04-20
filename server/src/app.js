import express from 'express';
import apiRoute, { apiProtectedRoute } from './routes/api.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authMiddleware from './middlewares/authMiddleware.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8000; // Use PORT from environment variable or default to 8000

const dbConnect = process.env.DB_CONNECT; // Access database connection string from environment variables

mongoose.connect(dbConnect)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Error connecting to DB:", err));

app.use(express.json());

app.use('/api', apiRoute); //When there are only two parameters in the app.use() function in Express, the second parameter can be either a middleware function or a router object or a route handler too.
app.use('/api',authMiddleware, apiProtectedRoute); //When there are three parameters in the app.use() function in Express, the second parameter is typically a middleware function.
//When there are three parameters in the app.use() function in Express, the third parameter can be a router object or a route handler function.
//route handler function is a function that takes a request object, a response object, and a next function as arguments and returns a response to the client. "next" is optional.
//the authMiddleware function is a middleware function that checks if the token is valid or not. If the token is valid, it will call the next function. If the token is invalid, it will return an error message to the client.
//that function is responsible for having "req.userId" value in the todo.controller.js file. This is because the "req.userId" value is set in the authMiddleware.js file. 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));