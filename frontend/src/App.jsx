import React, { useEffect } from 'react';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup'
import { Navigate } from 'react-router-dom';
import './App.css'

import socketIO from 'socket.io-client';

export const socket=socketIO.connect("http://localhost:3000",{
  query:{
      token:localStorage.getItem("token")
  }
})


const App = () => {

  useEffect(()=>{
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  })
  const token=localStorage.getItem("token")
  return (

    
<Routes>
  <Route path='/' element={token?<Home/>:<LoginSignup/>}/>
  <Route path='/home' element={token?<Home/>:<LoginSignup/>}/>
  
  

</Routes>


  );
}

export default App;
