import { useEffect, useState } from "react";
import { filterdataApi, followApi, FollowType, SendToApiFollowers, SendToApiVacations, } from "./service";
import { useAuth, } from "../../../context";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { BottomNavigation, BottomNavigationAction, CircularProgress, Grid, Pagination, Paper } from "@mui/material";
import VacationsList, { vacationCardUI } from "./vacationsList";
import usePagination from "../../handlers/pagination";
import HistoryIcon from '@mui/icons-material/History';



export function Vacations() {

  const {token } = useAuth();


  const [VacationsCards, setVacationsCards] = useState<Array<vacationCardUI>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersFollow, setUsersFollow] = useState<Array<FollowType>>([]);
  const [followChange, setFollowChange] = useState(false);
  const [valueFilter, SetValueFilter] = useState(0);
  
 


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

        // 
        // if (error?.response.data.message === "Unauthorized!") {
        alert(error?.response.data.message);
        //   setToken(null);
        // }
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
    <Grid
      

      sx={{

        bgcolor: "white",

        justifyContent: "center",
        
        color: "black",

      }}
    >
      <Grid  container sx={{ alignItems:"center" , display:"flex" ,flexDirection:"column", }}>

        <Grid   component={Paper} elevation={3} item xs={10} sx={{ alignItems:"center" , display:"flex" ,flexDirection:"column", pb:"2rem",mt:"2rem",borderRadius: '16px',mb:"2rem"}}>
      
        


        
        <Box   sx={{ width:" 100%",  }}>
      <BottomNavigation
        showLabels
        value={valueFilter}
        onChange={async (event, newValue) => {
          SetValueFilter(newValue);
          if (newValue===2) {
            const Result: any = await SendToApiVacations(token);
            setVacationsCards(Result)
          }else{
            const filterResult :any=await filterdataApi(token,newValue)
            setVacationsCards(filterResult)
          }
          
         
         
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="All" icon={<AutoAwesomeMotionIcon />} />
      </BottomNavigation>
      
  <h1>look at f for design</h1>
      </Box>

          <Box   sx={{ display: "flex", justifyContent: "center", margin: "4rem", flexWrap: "wrap", gap: "20px" }}>
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

  );
}

