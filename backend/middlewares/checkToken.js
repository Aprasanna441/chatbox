import  jwt  from "jsonwebtoken"
import userModel from "../model/userModel.js"

export const isLoggedIn=async (req,res,next)=>{
    
let token
    const {authorization}=req.headers
    if (authorization && authorization.startsWith('Bearer')){
        try{
              token=authorization.split(' ')[1]
             
            const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user=await userModel.findById(userID).select('-password')
            
            
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