
import { useAuth } from "../../../context";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export function Logout  () {
  const { setToken } = useAuth();


 
    setToken(null);

 







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