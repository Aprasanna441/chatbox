import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'searchItem',
  initialState: {
    value: " ",
  },
  reducers: {
    setSearchItem: (state,action) => {
      state.value=action.payload
    },
 
  },
})

// Action creators are generated for each case reducer function
export const {setSearchItem } = searchSlice.actions

export default searchSlice.reducer