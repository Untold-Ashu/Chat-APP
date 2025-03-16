import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";
import User from "../Models/user.models.js";
import { getReceivedSocketId, io } from "../socket/socket.js";



export const sendMessage=async (req,res)=>{
try {
    const {message}=req.body;
    const{ id:receiverId}=req.params;
    const senderId=req.user._id

    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]
    }})
    if(!conversation){
        conversation = await Conversation.create({
            participants:[senderId,receiverId]
        })
    }
    const newMessage= new Message({
        senderId,
        receiverId,
        message,
        createdAt:new Date()
    })
    if(newMessage){
        conversation.messages.push(newMessage._id);

    }

    //SOCKET
    const receiverSocketId = getReceivedSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage); 
    }


    await Promise.all([conversation.save(),newMessage.save()]);
    res.status(201).json(newMessage)
    
} catch (error) {
    console.log("Error in sendMassage controller: ",error.message);
    res.status(500).json({error:"internal server error"})
}
}
export const getMessages=async(req,res)=>{
    try {

        const{id:userTOChatId}=req.params;
         const senderId=req.user._id;

         const conversation= await Conversation.findOne({
            participants:{$all:[senderId,userTOChatId]}
         }).populate("messages")
         if(!conversation){
            return res.status(200).json([])
         }
         const messages= conversation.messages

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage controller: ",error.message);
        res.status(500).json({error:"internal server error"})
    }
}