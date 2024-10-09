import express from 'express';
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';

import connectToMongoDB from './db/connectToMongoDB.js';

import messageRoutes from "./routes/Messages.routes.js"
import authRoute from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"

dotenv.config();
const app= express();
app.use(cookieParser());
app.use(express.json());
const PORT= process.env.PORT||5000;

app.get("/",(req,res)=>{
    res.send("nodemon installed!")
})
app.use('/api/auth',authRoute);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);// for Users shown on Sidebar

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)
});