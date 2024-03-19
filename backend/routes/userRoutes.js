import express from 'express'
import { userLogin, userSignup,getUsers } from '../controller/userController.js'
import { isLoggedIn } from '../middlewares/checkToken.js'

const router=express.Router()







//middleware
router.get('/users',isLoggedIn)

//public
router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/users',getUsers)






//protected


export default router


