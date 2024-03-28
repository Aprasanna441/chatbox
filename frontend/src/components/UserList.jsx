import React, { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import { useSelector ,useDispatch} from 'react-redux';
import { setChatUser } from '../store/ChatContext';



const UserList = () => {
  const dispatch=useDispatch()
 
 
  const [data,setData]=useState([])
  const searchQuery=useSelector((state)=>state.searchItem.value)


  const fetchUsers=async ()=>{

    const res=await  fetch("http://127.0.0.1:3000/api/user/users",{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'authorization':`Bearer ${localStorage.getItem("token")}`
        }
    })
    const result=await res.json()
    
    setData(result.users)

  }

  useEffect(()=>{
    fetchUsers()
  },[searchQuery])

const [clickedId,setClickedId]=useState("")




  const selectChat=(item)=>{
    
  dispatch(setChatUser(item))
  setClickedId(item._id)
 
  }
  const redux_id=useSelector((state)=>state.chatUserId.value._id)

  return (

    <>
  HI {console.log(searchQuery)} hi
<div style={{overflowY: 'scroll',height:'70vhz'}}>
  
{data.map((item,index)=>(

      <Box component="section" key={index} className={item._id===redux_id?"bg-primary":"my-container"} sx={{ p: 2,borderBottom:"2px solid red",cursor:'pointer',padding:'2px', }}  onClick={()=>selectChat(item)}>
        <Stack direction="row" spacing={2}>
          
          <Avatar alt="Remy Sharp" src="https://avatar.iran.liara.run/public" />
          <h5>{item.name}</h5> <br />
         
        </Stack>
      </Box>
))}
     
   
      <br />
      <button onClick={()=>localStorage.removeItem("token")} className='btn btn-danger'>Logout</button>
      {searchQuery}
      </div>
    </>

  )
}

export default UserList



