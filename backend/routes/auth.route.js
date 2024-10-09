import {signup,login,logout} from '../controller/auth.controller.js'
import { sign } from "cookie-signature";
import express from 'express';
const router = express.Router();


router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);



export default router;