import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { startCronJobs } from './utils/cronJobs.js';

import membersRoutes from './routes/memberRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
startCronJobs();

const app=express();
app.use(express.json());

app.use("/api/members",membersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});