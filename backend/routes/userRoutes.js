import express from 'express'
import { userLogin, userSignup } from '../controller/userController.js'

const router=express.Router()







//middleware


//public
router.post('/signup',userSignup)
router.post('/login',userLogin)






//protected


export default router


