import React from 'react'

import Sidebar from '../components/Sidebar'
import MessengerBox from '../components/MessengerBox'


const Home = () => {

  return (

    <>

    <div className="container  mx-5 ">
      <div className="row justify-content-around">
    <div class=" col-sm-4 col-3 " >
   <Sidebar/>
      
    </div>
    <div class=" col-sm-8 col-9">

   <MessengerBox/>
     
    </div>
    </div>
   </div>
</>
  
  )
}

export default Home