import express from 'express'
import {isLoggedIn} from '../middlewares/checkToken.js'

import { sendMessage } from '../controller/messageController.js'

const router = express.Router()


//middleware
router.post('/send/:receiverId',isLoggedIn)


//public routes



//protected routes
router.post('/send/:receiverId',sendMessage)


export default router