import {chatData} from '../data.js'

export const userLogin=(req,res)=>{
    res.status(200).send({status:"Success",message:"Done"})
    }

export const chats=(req,res)=>{
    res.send(chatData)
}

export const  chat=(req,res)=>{
    console.log(req.params.id)
    const singleChat=chatData.find((c)=>c._id===req.params.id)
    res.send(singleChat)
}