import { userLogin } from '../controller/userController.js'
import express from 'express'


const router=express.Router()

//public routes 
router.get('/login',userLogin)

//middlewares



//protected routes

export default router



