import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/userAuthRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import vendorAuthRoutes from './routes/vendorAuthRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

connectDB();

// Routes
app.use('/api/user/auth', authRoutes);
app.use('/api/search', searchRoutes)
app.use('/api/vendor/auth', vendorAuthRoutes);


app.listen(PORT, () => console.log("Server running on port " + PORT));