import path from 'path';
import { fileURLToPath } from "url";
import express from 'express';
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });


import connectToMongoDB from './db/connectToMongoDB.js';

import messageRoutes from "./routes/Messages.routes.js"
import authRoute from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { app, server } from './socket/socket.js';



app.use(cookieParser());
app.use(express.json());
const PORT= process.env.PORT||8000;

app.use('/api/auth',authRoute);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);// for Users shown on Sidebar

const __dirname = path.resolve();  // Required for ES module
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,()=>{
    connectToMongoDB(process.env.MONGO_DB_URI);
    console.log(`server is running on port ${PORT}`)
});