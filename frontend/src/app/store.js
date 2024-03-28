import { configureStore } from '@reduxjs/toolkit'
import  chatUserReducer  from '../store/ChatContext'
import searchReducer from '../store/SearchContext'
import socketReducer from '../store/SocketContext'
export default configureStore({
  reducer: {
    chatUserId:chatUserReducer,
    searchItem:searchReducer,
    socket:socketReducer
  },
})