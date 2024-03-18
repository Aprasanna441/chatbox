import { chat,chats, userLogin } from '../controller/chatController.js'
import express from 'express'



const router=express.Router()

//public routes 
router.get('/login',userLogin)
router.get('/chat',chats)
router.get('/chat/:id',chat)

//middlewares



//protected routes

export default router



