import {body, validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'

const signupValidation=[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isStrongPassword().withMessage("Enter a strong password"),
    body("confirm_password")
      .isStrongPassword()
      .withMessage("Enter a strong password"),
]

const loginValidation=[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isStrongPassword().withMessage("Enter a strong password"),
  
]




export const userSignup = [signupValidation,async  (req,res)=> {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, send an error response
      return res.status(422).send({ errors: errors.array() });
    }


    const {name,email,password,confirm_password,gender}=req.body 
    const user = await userModel.findOne({ email: { $eq: email } });
    
    if (user){
        res.status(400).send({status:"Failed",message:"Email already exists"})
    }
    else{
        if (email && password && confirm_password){
            if (password=== confirm_password){
                    try{
                        const salt=await bcrypt.genSalt(10)
                        const hashPassword=await bcrypt.hash(password,salt)

                        //save user
                        const user=new userModel({
                            name:name,
                            email:email,
                            password:hashPassword,
                            gender:gender
                        })
                        await user.save();

                        const newUser=await userModel.findOne({email:email})

                        //return back JWT
                        const token=jwt.sign({
                            userID:newUser._id
                        },
                        process.env.JWT_SECRET_KEY,
                        {expiresIn:"5d"})

                        res.status(200).send({status:"Success",message:"User Registered",token:token})



                    }
                    catch(Error){
                        res.status(400).send({status:"Failed",message:Error})
                    }
            }
            else{
                res.status(400).send({status:"Failed",message:"Password and Confirm Password didnt match"})

            }
        }
        else{
            res.status(400).send({status:"Failed",message:"Enter all fields"})

        }
    }
 
   
  
 
    
}]




export const userLogin = [loginValidation,
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If there are validation errors, send an error response
        return res.status(422).send({ errors: errors.array() });
      }
      try {
        const { email, password } = req.body;
        if (email && password) {
          const user = await userModel.findOne({ email: { $eq: email } });
          if (user != null) {
            const isMatched = await bcrypt.compare(password, user.password);
            if (isMatched) {
              const token = jwt.sign(
                { userID: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "5d" }
              );
              res.status(200).send({
                token: token,
                status: "Success",
                message: "Login Success",
              });
            } else {
              res.send({
                status: "Failed",
                message: "Email or Password not valid",
              });
            }
          } else {
            res.send({ status: "Failed", message: "Not a registered user" });
          }
        } else {
          res.send({
            status: "Failed",
            message: "None of the field can be empty",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(400).send({ status: "Failed", message: "Exception" });
      }
    },
  ];

  

export const userLogout=async (req,res)=>{
    console.log("Logout")

}