import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './api/routes/user.route.js';
import authRouter from './api/routes/auth.route.js';
import listingRouter from './api/routes/listing.route.js';
import cookieParser from 'cookie-parser';

// Load environment 
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

app.use(express.json());
app.use(cookieParser());



app.listen(process.env.PORT, () => {
    console.log('Server is running');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
