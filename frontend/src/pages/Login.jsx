import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';

import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { useState } from 'react';



const Optionn=styled(Option)`
color:black;
list-style:none;
`








const Login = () => {
  const navigate = useNavigate();
const [serverError,setServerError]=useState("")
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm_passwordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 


  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const actualData={
 
      email: data.get("email"),
      password: data.get("password"),
  
    }
    

    isEmail(actualData.email)
      ? setEmailError("")
      : setEmailError("Enter a proper Email");
    isStrongPassword(actualData.password, { minLength: 8 })
      ? setPasswordError("")
      : setPasswordError("Enter a  min 8 digit alphanumeric password");
  
  


    if (! (emailError && nameError && passwordError && confirm_passwordError)){
      setIsLoading(true);
      const res= await fetch("http://127.0.0.1:5000/api/user/login",{
      method:"POST",
      headers: {
       "Content-Type": "application/json",
     },
      body:JSON.stringify(actualData)
     }
      )
      setIsLoading(false);

      const result = await res.json();
      console.log(result)
      if (result.status==="Success"){
        localStorage.setItem("token",result.token)
        localStorage.setItem("userData",JSON.stringify(result.user))
       
        navigate('/home')
      }
      else{
        setServerError(result.message)
      }
      

    }



  
  }




  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >

      {isLoading?"Loading":""}
      <div style={{color:'red'}}>
        {serverError}
        {nameError} 
      {emailError}
      {passwordError}
      {confirm_passwordError}
      <h3>Login</h3>
      </div>
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        required
        name="email"
      /> <br />


      <TextField
        id="standard-basic"
        label="Password"
        variant="standard"
        required
        name="password"
      /> <br />


      <Button variant="contained" sx={{ mt: 5 }} type="submit">
        Login
      </Button>



    </Box>
  )
}

export default Login