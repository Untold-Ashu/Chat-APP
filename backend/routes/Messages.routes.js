import express from 'express';
import  {sendMessage,getMessages}  from '../controller/Message.controller.js';
import protectRoute from '../middleware/protect.route.js';
const router= express.Router()


router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);

export default router;