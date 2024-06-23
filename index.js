import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './api/routes/user.route.js';
import authRouter from './api/routes/auth.route.js';
import listingRouter from './api/routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package

// Load environment variables
dotenv.config();

if (!process.env.MONGO) {
    throw new Error('Missing MONGO environment variable');
}

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB', err);
    });

const app = express();

// Configure CORS to allow any origin
app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

const PORT = process.env.PORT || 3000; // Use a default port if PORT is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`Error: ${message}`);
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
