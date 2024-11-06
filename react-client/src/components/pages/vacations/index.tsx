import { useEffect, useState } from "react";
import { filterdataApi, followApi, FollowType, SendToApiFollowers, SendToApiVacations, } from "./service";
import { useAuth, } from "../../../context";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { BottomNavigation, BottomNavigationAction, CircularProgress, createTheme, Grid, Pagination, Paper, ThemeProvider } from "@mui/material";
import VacationsList, { vacationCardUI } from "./vacationsList";
import usePagination from "../../handlers/pagination";
import AddTaskIcon from '@mui/icons-material/AddTask';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary:{
      main: '#fff',
    }
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          
          backgroundColor: '#1976d2',
        },
     
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          borderRadius:"10px",
          color:"#fff",
          '&.Mui-selected': {
            color: '#0009', 
             backgroundColor: '#fff'
          },
        },
      },
    },
  },
});

export function Vacations() {

  const {token } = useAuth();


  const [VacationsCards, setVacationsCards] = useState<Array<vacationCardUI>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersFollow, setUsersFollow] = useState<Array<FollowType>>([]);
  const [followChange, setFollowChange] = useState(false);
  const [valueFilter, SetValueFilter] = useState(3);
  
 

  


  useEffect(() => {
    let isSetState = true;
    async function tableStart() {
      try {
        setIsLoading(true);
        
       
        const result: any = await SendToApiVacations(token);

        const resultFollowers: any = await SendToApiFollowers(token);
        if (isSetState) {

          setUsersFollow(resultFollowers)
          setVacationsCards(result);
         
        }
      } catch (error: any) {
        console.log(error);

    
        alert(error?.response.data.message);
       
      } finally {
        setIsLoading(false);
      }
    }
    tableStart();
    return () => {
      isSetState = false;
    };
  }, [followChange]);
 
   function toggleFollow(card: vacationCardUI) {
              
    if (card.isFollowed===true) {
      card.isFollowed=false
      followApi(card.isFollowed,card.id)
      setFollowChange(!followChange)
    }else{
      card.isFollowed=true
      followApi(card.isFollowed,card.id)
      setFollowChange(!followChange)
     
    }
  }

  
  const [page, setPage] = useState<number>(1);
  const PER_PAGE = 6;

  const count = Math.ceil(VacationsCards.length / PER_PAGE);
  const data = usePagination(VacationsCards, PER_PAGE);
  const handleChange = (e:any, p:any) => {
    setPage(p);
    data.jump(p);
  };




  return (
    <ThemeProvider theme={theme}>
    <Grid
      

      sx={{

        bgcolor: "white",
        color: "black",

      }}
    >
      <Grid  container sx={{ alignItems:"center" , display:"flex" ,flexDirection:"column", }}>

        <Grid   item xs={10} sx={{ alignItems:"center" , display:"flex" ,flexDirection:"column", pb:"2rem",mt:"2rem",borderRadius: '10px',mb:"2rem",width:"100%"}}>
      
        


        <Grid sx={{ alignItems:"center" , display:"flex" ,flexDirection: { xs: "column",  md: "row" },width:"100%",padding:"1rem",justifyContent:"space-between" ,bgcolor:"#1976d2",borderRadius: '7px'}}>
        <Grid >
        <Pagination
        sx={{ '& .MuiPaginationItem-root': {
          color: 'white', 
        },
        '& .MuiPaginationItem-root.Mui-selected': {
          color: '#0009', 
          
        }}}
       color="secondary"
        count={count}
        size="large"
        page={page}
        shape="rounded"
        onChange={handleChange}
      />
      </Grid>
  
        <Grid  item xs={12} sm={4}>
      <BottomNavigation
      
        showLabels
        value={valueFilter}
        onChange={async (event, newValue) => {
          SetValueFilter(newValue);
          if (newValue===3) {
            const Result: any = await SendToApiVacations(token);
          
            setVacationsCards(Result)
            
          }else{
            const filterResult :any=await filterdataApi(token,newValue)
            setVacationsCards(filterResult)
            handleChange(event,1)
            
          }
          
         
         
        }}
       
      ><BottomNavigationAction  label="Not started" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Active" icon={<AddTaskIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="All" icon={<AutoAwesomeMotionIcon />} />
      </BottomNavigation>
      
      

      </Grid>
      </Grid>

          <Box   sx={{ display: "flex", justifyContent:"center", marginTop: "2rem", flexWrap: "wrap", gap: "30px" , marginBottom: "2rem"}}>
            {isLoading ? <CircularProgress />
              : <VacationsList vacations={data.currentData()}
                usersFollow={usersFollow}
                doSomething={(v: vacationCardUI): void => {
                  toggleFollow(v)
              }}
              />}
          </Box>
          
          <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
  
          
        </Grid>
      </Grid>
      <CssBaseline />
    </Grid>
    </ThemeProvider>
  );
}

