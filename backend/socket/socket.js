import {Server} from 'socket.io'

import http from 'http'
import express from 'express'
import jwt from 'jsonwebtoken'



const app=express()

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]
    }
});


export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}


const userSocketMap={};//userid:socketid

io.on('connection',(socket)=>{

   
console.log("User entered",socket.id)
  















socket.on('sendMessage', ({text,receiverId}) => {
    const token = socket.handshake.query.token;
    const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
    userSocketMap[userID]=socket.id
	const socketId = userSocketMap[receiverId];
   
    io.to(socketId).emit('message', text); // Broadcast the message to all connected clients
});


















socket.on('disconnect',()=>{
    console.log("User disconnected",socket.id)
    // delete userSocketMap[userId]
 
})

})


export {app,io,server}
