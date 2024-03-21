import React, { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import { useSelector ,useDispatch} from 'react-redux';
import { setChatUser } from '../store/ChatContext';



const UserList = () => {
 
  const [data,setData]=useState([])
  const dispatch=useDispatch()

  const fetchUsers=async ()=>{

    const res=await  fetch("http://127.0.0.1:5000/api/user/users",{
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
  },[])

const [clickedId,setClickedId]=useState("")




  const selectChat=(item)=>{
    console.log(item._id)
  dispatch(setChatUser(item))
  setClickedId(item._id)
 
  }
  const redux_id=useSelector((state)=>state.chatUserId.value._id)

  return (

    <>
  {clickedId}
<div style={{overflowY: 'scroll',height:'70vh'}}>
  
{data.map((item,index)=>(

      <Box component="section" className={item._id===redux_id?"bg-primary":"my-container"} sx={{ p: 2,borderBottom:"2px solid red",cursor:'pointer',padding:'2px', }}  onClick={()=>selectChat(item)}>
        <Stack direction="row" spacing={2}>
          
          <Avatar alt="Remy Sharp" src="https://avatar.iran.liara.run/public" />
          <h5>{item.name}</h5> <br />
         
        </Stack>
      </Box>
))}
     
   
      <br />
      <button onClick={()=>localStorage.removeItem("token")} className='btn btn-danger'>Logout</button>
      </div>
    </>

  )
}

export default UserList



