import express from 'express';
import apiRoute from './routes/api.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8000; // Use PORT from environment variable or default to 8000

const dbConnect = process.env.DB_CONNECT; // Access database connection string from environment variables

mongoose.connect(dbConnect)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Error connecting to DB:", err));

app.use(express.json());

app.use('/api', apiRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));