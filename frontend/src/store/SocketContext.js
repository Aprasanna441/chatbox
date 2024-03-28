import { createSlice } from '@reduxjs/toolkit'
import { io } from "socket.io-client";

import { useSelector } from 'react-redux';
export const socketSlice = createSlice({

  name: 'socket',
  initialState: {
    value: null,
  },
  reducers: {
    setSocket: (state,action) => {

        if (localStorage.getItem("token")){
            const socket=io("http://localhost:5000",{
                query:{
                    userId:id
                }
            })

      state.value=action.payload
        }
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { setSocket } = socketSlice.actions

export default socketSlice.reducer