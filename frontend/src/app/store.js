import { configureStore } from '@reduxjs/toolkit'
import  chatUserReducer  from '../store/ChatContext'
import searchReducer from '../store/SearchContext'

export default configureStore({
  reducer: {
    chatUserId:chatUserReducer,
    searchItem:searchReducer
  },
})