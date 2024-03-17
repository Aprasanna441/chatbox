import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

const app=express()

import userRoutes from '../backend/routes/userRoutes.js'






app.use("/users",userRoutes)

app.use(cors())


app.use("/api/user",userRoutes)

app.listen(5000,()=>{
console.log(`Server running at port`+5000)
})