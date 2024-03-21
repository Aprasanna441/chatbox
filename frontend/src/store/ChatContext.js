import { createSlice } from '@reduxjs/toolkit'

export const chatUserSlice = createSlice({
  name: 'chatuserid',
  initialState: {
    value: {},
  },
  reducers: {
    setChatUser: (state,action) => {
      state.value=action.payload
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { setChatUser } = chatUserSlice.actions

export default chatUserSlice.reducer