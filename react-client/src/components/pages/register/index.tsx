import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { z } from "zod"
import { CircularProgress, InputLabel, Tooltip } from '@mui/material';
import { registerApi } from './service';
import  backgroundImage from "../../../asset/images/backroundImage.jpg";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const defaultTheme = createTheme();

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

const firstNameSchema = z.string().min(1)
const lastNameSchema = z.string().min(1)
const emailSchema = z.string().email().min(15)
const passwordSchema = z.string().regex(passwordRegex)




export default function RegistrationForm() {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({ isError: false, errorMessage: "" });
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState({ isError: false, errorMessage: "" });


  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState({ isError: false, errorMessage: "" });



  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({ isError: false, errorMessage: "" });



  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState({ isError: false, errorMessage: "" });



  function isFirstNameValid() {
    const result = firstNameSchema.safeParse(firstName);
    if (result.success) {
      setFirstNameError({ isError: false, errorMessage: "" })
    } else {
      const errors = result?.error?.issues.map(e => e.message)
      setFirstNameError({ isError: true, errorMessage: errors.join(", ") })
    }
  }


  function isLastNameValid() {
    const result = lastNameSchema.safeParse(lastName);
    if (result.success) {
      setLastNameError({ isError: false, errorMessage: "" })
    } else {
      const errors = result?.error?.issues.map(e => e.message)
      setLastNameError({ isError: true, errorMessage: errors.join(", ") })
    }
  }

  function isEmailValid() {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      setEmailError({ isError: false, errorMessage: "" })
    } else {
      const errors = result?.error?.issues.map(e => e.message)
      setEmailError({ isError: true, errorMessage: errors.join(", ") })
    }
  }

  function isPasswordValid() {
    const result = passwordSchema.safeParse(password);
    if (result.success) {
      setPasswordError({ isError: false, errorMessage: "" })
    } else {
      const errors = result?.error?.issues.map(e => e.message)
      setPasswordError({ isError: true, errorMessage: errors.join(", ") })
    }
  }


  function isSubmitDisabled(): boolean {
    if (!email || !firstName || !lastName || !password) {
      return true
    }
    if (firstNameError.isError || emailError.isError || passwordError.isError || lastNameError.isError) {
      return true
    }
    return false;
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await registerApi({ first_name:firstName,  last_name:lastName, email, password})
      navigate("/login")
    } catch (error:any) {
      console.log(error, "error")
      setInputError({isError : true, errorMessage:error?.response?.data?.error  })
      
    } finally {
      setIsLoading(false)
    }
   
  };



  return (
    <ThemeProvider theme={defaultTheme}>
       <div   style={{ backgroundImage:`url(${backgroundImage})`, backgroundSize: 'cover',backgroundPosition: 'center' }}>
      <Grid container component="main" sx={{bgcolor:"transparent", height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Grid item component={Paper} elevation={6} square sx={{ boxShadow: 3,   width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(10deg,white 85%, #1976d200 100%)'
         }}>
        <Box
        sx={{
          alignItems: 'center',
         justifyContent: "center",
          display: 'flex',
          width: "100%",
            background: 'linear-gradient(10deg,#1976d2 30%, #1976d200 120%)',
          color:"white",
          padding:2
        }}
      >
          <Typography component="h2" variant="h4" >
            Register
          </Typography>
          <Avatar  sx={{ bgcolor:'white', marginLeft:2}} >
            <AutoStoriesIcon sx={{ color:'#1976d2' }}/>
          </Avatar>
          </Box>
          <Box component="form" sx={{ mt: 1 ,p:3}}>
            <InputLabel style={{ color: "#D32F2E" }}>
              {inputError.errorMessage}
            </InputLabel>
            
            {/* First Name and Last Name  */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  onBlur={isFirstNameValid}
                  helperText={firstNameError.errorMessage}
                  error={firstNameError.isError}
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  onBlur={isLastNameValid}
                  helperText={lastNameError.errorMessage}
                  error={lastNameError.isError}
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Email Field */}
            <TextField
              margin="normal"
              onBlur={isEmailValid}
              helperText={emailError.errorMessage}
              error={emailError.isError}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              type="email"
            />

            {/* Password Field */}
            <Tooltip title={"Password must be at least 8 characters and include a special character, an uppercase letter, and a number."}>
            <TextField
              margin="normal"
              onBlur={isPasswordValid}
              helperText={passwordError.errorMessage}
              error={passwordError.isError}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              type="password"
            />
            </Tooltip>
            {/* Submit Button */}
            {isLoading ? (
              <LoadingLogin />
            ) : (
              <Button disabled={isSubmitDisabled()} variant="contained" onClick={handleSubmit} color="primary" fullWidth sx={{ mt: 2 }}>
                Submit
              </Button>
            )}
             <Button  onClick={() => {
                navigate("/login")
            }}  type="button" sx={{marginLeft:"370px", marginTop:"20px",fontSize:"small"}}>Already have a user</Button>
          </Box>
        </Grid>
      </Grid>
      </div>
    </ThemeProvider>
  );
}


function LoadingLogin() {
  return <span> <CircularProgress /> Please wait ...  </span>
}