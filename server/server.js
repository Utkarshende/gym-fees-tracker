import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { startCronJobs } from './utils/cronJobs.js';
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js";


import membersRoutes from './routes/memberRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
startCronJobs();

const app=express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());



app.use("/api/members",membersRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});