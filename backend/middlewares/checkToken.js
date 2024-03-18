import  jwt  from "jsonwebtoken"
import userModel from "../model/userModel.js"

export const isLoggedIn=async (req,res,next)=>{
    

    const {authorization}=req.headers
    if (authorization && authorization.startsWith('Bearer')){
        try{
             const token=authorization.split(' ')[1]
            const {userId}=jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user=await userModel.findById(userId).select('-password')
            next()

        }
        catch(Error){
            console.log("errpr")
            res.status(400).send({status:"Failed",message:Error})
        }
    }
    else{
        res.status(400).send({status:"Failed",message:"Unauthorized User"})
    }
}