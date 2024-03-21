import React from 'react'
import Login from './Login';
import Signup from './Signup';
import { Button } from '@mui/material'

import { Container } from '@mui/material';

import { useState } from 'react'


const LoginSignup = () => {
    const [tab,setTab]=useState(true)
  return (

    <Container maxWidth="sm" sx={{border:'1px solid black',marginTop:'1%' ,backgroundColor:'wheat',marginLeft:'60%'}}>
      <h2 style={{textAlign:'center',marginBottom:'10px',color:'red'}}>ChatBox </h2>

   <div className="top" style={{textAlign:'center' ,marginTop:'1%'}}>
   <Button  variant='contained'  style={{borderRadius:'50px'}} onClick={()=>{setTab(true)}} >Login</Button>
   <Button variant='contained'  style={{borderRadius:'50px'}} onClick={()=>{setTab(false)}}  >Signup</Button>

{tab?<Login/> :<Signup/>}
  
   </div>
    </Container>
  )
}

export default LoginSignup