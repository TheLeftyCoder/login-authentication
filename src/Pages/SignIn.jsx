import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-phone-input-2/lib/style.css';
import styled from '@emotion/styled';
import axios from 'axios';
import { TextField } from '@mui/material';
// TODO remove, this demo shouldn't need to reset the theme.

const Number = styled(Box)`
margin-bottom : 20px;
margin-top : 20px;
`

// save the token to check whether the user is logged in or not , 
// 

const defaultTheme = createTheme();

export default function SignInSide() {

  const [token,settoken] = useState('')

  // const token = 'your_token_here';

  // Save the token in local storage
  localStorage.setItem('token', token);

  // Retrieve the token from local storage
  const storedToken = localStorage.getItem('token');

  // Use the stored token
  console.log(storedToken);


  const [otp,setotp] = useState('');

  // const [verifyotp,setverifyotp] = useState('');
  
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleOtp = async(event) =>{
    event.preventDefault();
    await axios.post('http://89.116.179.29:8910/verify_otp',{
      phone : phoneNumber,
      otp : otp
    }
    )
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    await axios.post('http://89.116.179.29:8910/fetch_otp',{
      phone : phoneNumber
    }
    )
    .then(response => {
      console.log(response.data);
      // console.log(response.data.status);
      if(response.data.status === "OK"){
        setotp(response.data.otp);
        settoken(response.data.token)
      }else{
        alert("user do not exist")
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Number>
            <TextField
      label="Phone Number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      placeholder="Enter phone number"
      fullWidth
      name = "phone"
      variant="outlined"
      type="tel"
      inputProps={{
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}', // Optional: enforce a specific pattern
      }}
    />
            </Number>
            <Button variant = "outlined" onClick={handleSubmit}>Send otp</Button>
            <Number>
            <TextField
      label="OTP"
      value={otp}
      onChange={(e) => setotp(e.target.value)}
      placeholder="Enter otp"
      fullWidth
      name = "phone"
      variant="outlined"
      type="tel"
      inputProps={{
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}', // Optional: enforce a specific pattern
      }}
    />

            </Number>
            <Button variant = "outlined" onClick={handleOtp}>Verify Otp</Button>
            </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}