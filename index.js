import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/userAuthRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import vendorAuthRoutes from './routes/vendorAuthRoutes.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/dbConfig.js';
import authMiddleware from './middleware/authMiddleware.js';
import vendorCrudRoutes from './routes/vendorsCRUDroutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user/auth', authRoutes);
app.use('/api/vendor/auth', vendorAuthRoutes);
app.use('/api/search', authMiddleware,searchRoutes);
app.use('/api/vendor',authMiddleware,vendorCrudRoutes);
app.use('/api/user',authMiddleware, userRoutes);


app.listen(PORT,() => console.log("Server running on port " + PORT));