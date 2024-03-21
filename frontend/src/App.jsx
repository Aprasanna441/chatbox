import React from 'react';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup'
import { Navigate } from 'react-router-dom';
import './App.css'

const App = () => {
  const token=localStorage.getItem("token")
  return (

    
<Routes>
  <Route path='/' element={token?<Home/>:<LoginSignup/>}/>
  <Route path='/home' element={token?<Home/>:<LoginSignup/>}/>
  
  

</Routes>


  );
}

export default App;
