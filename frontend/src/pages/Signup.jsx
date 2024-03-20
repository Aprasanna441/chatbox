import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import styled from '@emotion/styled';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';

import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { useState } from 'react';

const gender = [
  {
    value: "male",
    label: 'Male'
  },
  {
    value: "female",
    label: "Female"
  }
]


const Optionn = styled(Option)`
color:black;
list-style:none;
`








const Signup = () => {

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm_passwordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");



  const submitHandler = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    console.log(data.get("gender"))
    const actualData = {
      name: data.get("name"),
      gender: data.get("gender"),
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    }


    actualData.name === "" ? setNameError("Enter Name ") : setNameError("")
    isEmail(actualData.email)
      ? setEmailError("")
      : setEmailError("Enter a proper Email");
    isStrongPassword(actualData.password, { minLength: 8 })
      ? setPasswordError("")
      : setPasswordError("Enter a  min 8 digit alphanumeric password ");
    isStrongPassword(actualData.confirm_password, { minLength: 8 })
      ? setPasswordError("")
      : setConfirmPasswordError("Enter a  min 8 digit alphanumeric password ");
    actualData.confirm_password !== passwordError ? setPasswordError("")
      : setConfirmPasswordError("Confirm Password Please");


    if (!(emailError && nameError && passwordError && confirm_passwordError)) {
      const res = await fetch("http://127.0.0.1:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actualData)
      }
      )

      const result = await res.json();
      console.log(result.token)

    }



  }




  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <div style={{ color: 'red' }}>
        {nameError} 
        {emailError} 
        {passwordError} 
        {confirm_passwordError} 
      <h3>Signup</h3>
      </div>
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        required
        name="name"
      /> <br />
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        required
        name="email"
      /> <br />


      <TextField
        id="filled-select-currency-native"
        select
        label="Select Gender"
        defaultValue="EUR"
        SelectProps={{
          native: true,
        }}

        variant="filled"
        name='gender'
      >

        {gender.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </TextField>
      <br />

      <TextField
        id="standard-basic"
        label="Password"
        variant="standard"
        required
        name="password"
      /> <br />
      <TextField
        id="standard-basic"
        label="Confirm Password"
        variant="standard"
        required
        type='password'

        name="confirm_password"
      /> <br />

      <Button variant="contained" sx={{ mt: 5 }} type="submit">
        Signup
      </Button>



    </Box>
  )
}

export default Signup