import { configureStore } from '@reduxjs/toolkit'
import  chatUserReducer  from '../store/ChatContext'

export default configureStore({
  reducer: {
    chatUserId:chatUserReducer
  },
})