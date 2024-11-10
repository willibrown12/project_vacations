import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export function Logout  () {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/home");
  };

  setTimeout(() => {
    handleLogout();
  },  2000);







  return  <ThemeProvider theme={defaultTheme}>
 
  <Grid
 
    container
    component="main"
    sx={{ bgcolor:"white",height: '100vh', justifyContent: 'center', alignItems: 'center', color:"black"
     
      }
  }
  >
    
  </Grid>
  <CssBaseline />
</ThemeProvider>
};

export default Logout;