import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDb from '../backend/config/connectDb.js'
import chatRoutes from '../backend/routes/chatRoutes.js'
import userRoutes from '../backend/routes/userRoutes.js'
import messageRoutes from '../backend/routes/messageRoutes.js'



const port = process.env.PORT
const db_url = process.env.DATABASE_URL

const app = express()
app.use(cors())
app.use(express.json())








app.use("/api/chat", chatRoutes)
app.use("/api/user", userRoutes)
app.use("/api/message", messageRoutes)





app.listen(port, () => {
    connectDb(db_url)
    console.log(`Server running at port ${port}`)
})