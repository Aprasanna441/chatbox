import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';

import setSearchItem from '../store/ChatContext'



export default function SearchBar() {
const dispatch=useDispatch()

const setQuery=(item)=>{
  dispatch(setSearchItem(item))

}

  return (
    <Paper
      component="form"
      sx={{marginLeft:'31%',p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
    >
   
     

      <InputBase
        sx={{ ml: 1, flex: 1, }}
        placeholder="Search User"
        inputProps={{ 'aria-label': 'search user' }}
        onChange={(item)=>setQuery(item)}
      />


      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

    </Paper>
  );
}