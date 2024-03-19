import chatModel from '../model/chatModel.js'
import messageModel from '../model/messageModel.js'

export const sendMessage = async (req, res) => {
   try {
      const { message } = req.body
      const receiverId = req.params.id
      const senderId = req.user._id

      const newMessage = new messageModel({
         senderId,
         receiverId,
         message
      })
      newMessage.save()
     


      let chat = await chatModel.findOne({
         participants: { $all: [senderId, receiverId] },
      })

      if (!chat) {
         
         chat = new chatModel({
            participants: [senderId, receiverId]

         })  
      }
      chat.messages.push(newMessage._id);
      chat.save()
       res.status(201).send({ status: "Success", senderId: senderId, receiverId: receiverId })
   }
   catch (Error) {
      res.status(500).send({ status: "Failed", message: Error })
   }
}





export const getMessages = async (req,res)=>{

   try{
const receiverId=req.params.id
const senderId=req.user._id
const chat=await chatModel.findOne({participants:{$all:[senderId,receiverId]},}).populate("messages")
if (!chat){

   res.status(400).send({status:"Success",data:chat.messages})
}
else{
res.status(200).send({status:"Success",data:chat.messages})
}
   }catch(Error){
      res.status(500).send({ status: "Failed", message: Error })
   }

}