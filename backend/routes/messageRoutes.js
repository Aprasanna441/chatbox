import express from 'express'
import {isLoggedIn} from '../middlewares/checkToken.js'

import { getMessages, sendMessage } from '../controller/messageController.js'

const router = express.Router()


//middleware
router.post('/send/:id',isLoggedIn)
router.get('/:id',isLoggedIn)


//public routes



//protected routes
router.post('/send/:id',sendMessage)
router.get('/:id',getMessages)


export default router