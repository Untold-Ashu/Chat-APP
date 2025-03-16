import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});
export const getReceivedSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // ✅ Fixed extra {}

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        // Find user by socket ID and remove from map
        const disconnectedUser = Object.keys(userSocketMap).find(
            (key) => userSocketMap[key] === socket.id
        );

        if (disconnectedUser) {
            delete userSocketMap[disconnectedUser];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("📢 Emitting Online Users:", Object.keys(userSocketMap));

    });
});

export { app, io, server };
