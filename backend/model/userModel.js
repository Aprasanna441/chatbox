import mongoose from "mongoose";
import multer from 'multer'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true       
    },
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    joined_on:{
        type:Date,
        default:Date.now

    },
    isSuperUser:{
        type:Boolean,
        default:false,
        required:true
    },
    profilePicture: {
       type:String,
       default:""
      }
},{ timestamps: true })

const userModel=mongoose.model("User",userSchema)
export default userModel