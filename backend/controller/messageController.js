export const sendMessage=async (req,res)=>{
     try{
        const {message}=req.body
        const {receiverId}=req.params.receiverId
        const  senderId=req.user._id
        console.log(req.user._id)

     }
     catch(Error){
        res.status(500).send({status:"Failed",message:Error})
     }
}