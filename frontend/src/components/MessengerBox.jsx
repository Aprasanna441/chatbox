import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Message from './Message';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Tooltip from '@mui/material/Tooltip';


import FormControl from '@mui/material/FormControl';


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { useRef } from 'react';





const MessengerBox = () => {


  
  const messageRef=useRef(null)
  const scrollRef = useRef(null);
  const chatSelected = useSelector((state) => state.chatUserId.value)



  const [messageData, setData] = useState()

  const fetchMessages = async () => {

    const res = await fetch(`http://127.0.0.1:3000/api/message/${chatSelected._id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    const result = await res.json()
    
    


    setData(result.data)


  }
  useEffect(() => {
    if (chatSelected !== "") {
      fetchMessages()
 
    }
    
   
    
  }, [chatSelected,messageData])





  const sendMessage=async (e) => {
    if(e.key==="Enter"){
      e.preventDefault()

      //to the bottom scroll
      
      if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
   
    const res = await fetch(`http://127.0.0.1:3000/api/message/send/${chatSelected._id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({message:e.target.value})
    })
    const result = await res.json()
    messageRef.current.value("")
   if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
  }
  }

  return (


    <Box  className='my-container vh-90' sx={{ position: 'relative', width: '100%' }}>
      {chatSelected._id ? (
        <div className="container container-fluid p-0" >

          <div className="row  ">
            <div className="col-12">
              <nav class="navbar navbar-dark bg-dark p-2">
                <Stack direction="row" spacing={2}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <h2 style={{ color: 'white' }}>{chatSelected.name}</h2>
                </Stack>
              </nav>
            </div>

            {/* //messages */}

            <div className="col-12  " >

              <Paper style={{ height: "70vh", overflowY: 'scroll', border: "1px solid red" }} ref={scrollRef}>
                {/* message loop starts     */}
                <Stack direction="column" spacing={2}>


                  {messageData ? messageData.map((item, index) => (





                    <Stack direction="row" spacing={2}>
                                            
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                     
                      <p className='my-container' style={{ width: '80%', textAlign: "justify" }}>{item.message}</p>
                      <Tooltip title={item.createdAt}>
                        <p>{item.createdAt.split('T')[1].split(".")[0].slice(0,5)}</p>
                     
                      </Tooltip>


                    </Stack>


                    

                  )) : "Chat is Empty"}




                </Stack>
              </Paper>

            </div>
            <div className="col-12 ">
              {/* Input */}



              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', position: 'absolute', bottom: -50 }}
                onSubmit={sendMessage}
              >



                <InputBase
                 
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Enter message and hit enter"
                  inputProps={{ 'aria-label': 'Enter message and hit enter' }}
                  onKeyDown={sendMessage}
                 
                  name="message"
                 

                />


                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              </Paper>


            </div>
          </div>
        </div>

      ) : (<EmptyChat />)

      }
    </Box>

  )

}







export default MessengerBox

export const EmptyChat = () => {
  return (

    <div className='d-flex justify-center align-center bg-info '> Empty Page</div>
  )
}