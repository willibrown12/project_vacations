import { useEffect, useState } from "react";
import { followApi, FollowType, SendToApiDelete, SendToApiFollowers, SendToApiVacations } from "./service";
import { useAuth, useEditContext, useUserContext } from "../../../context";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { BottomNavigation, BottomNavigationAction, Button, CircularProgress, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Pagination, ThemeProvider } from "@mui/material";
import VacationsList, { vacationCardUI } from "./vacationsList";
import usePagination from "../../handlers/Pagination"
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
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
          borderRadius: "10px",
          color: "#fff",
          '&.Mui-selected': {
            color: '#0009',
            backgroundColor: '#fff',
          },
        },
      },
    },
  },
});

export function Vacations() {


  const navigate = useNavigate();
  const { seteditVacation }= useEditContext()
  const { token } = useAuth();
  const { role } = useUserContext()

  const [VacationsCards, setVacationsCards] = useState<Array<vacationCardUI>>([]);
  const [displayCards, setDisplayCards] = useState<Array<vacationCardUI>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersFollow, setUsersFollow] = useState<Array<FollowType>>([]);
  const [valueFilter, SetValueFilter] = useState(2);
  const [idToDelete, SetIdToDelete] = useState<number>(NaN);
  const [buttonFavorites, SetbuttonFavorites] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    let isSetState = true;
    async function tableStart() {
      try {
        setIsLoading(true);
        const result: any = await SendToApiVacations(token);
        const resultFollowers: any = await SendToApiFollowers(token);
        console.log(result);
        
        if (isSetState) {
          setUsersFollow(resultFollowers);
          setVacationsCards(result);
          setDisplayCards(result);
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
  }, []);



  async function toggleFollow(card: vacationCardUI) {
    try {

      const newFollowState = !card.isFollowed;
      const result = await followApi(newFollowState, card.id);


      if (result.message === "unfollow") {
        const newcards: any = displayCards.map((c) => {
          if (c.id === card.id) {


            const findindex = usersFollow.findIndex(i => i.idlocation === c.id)
            if (findindex !== -1) {
              usersFollow.splice(findindex, 1)
              c.followers_count = c.followers_count - 1
            }


            return c
          }
          return c
        })
        setDisplayCards(newcards);
        console.log(displayCards);

      } else {
        const newcards: any = displayCards.map((c) => {
          if (c.id === card.id) {

            usersFollow.push({ idlocation: c.id })
            c.followers_count = c.followers_count + 1



            return c
          }
          return c
        })
        setDisplayCards(newcards);
        console.log(displayCards);
      }


    } catch (error) {
      alert("Something went wrong");
    }
  }

  const [page, setPage] = useState<number>(1);
  const PER_PAGE = 6;
  const count = Math.ceil(displayCards.length / PER_PAGE);
  const data = usePagination(displayCards, PER_PAGE);

  const handleChange = (e: any, p: any) => {
    setPage(p);
    data.jump(p);
  };




  useEffect(() => {

    setPage(1);
    const sendvalue = valueFilter === 1 ? "active" : valueFilter === 2 ? "all" : "notactive";

    let filterResult: vacationCardUI[] = [];
    if (sendvalue === "active") {
      filterResult = VacationsCards.filter((vacation) => {
        const startDate = new Date(vacation.start_date);
        const endDate = new Date(vacation.end_date);
        return startDate <= new Date() && new Date() <= endDate;
      });
    } else if (sendvalue === "notactive") {
      filterResult = VacationsCards.filter((vacation) => {
        const startDate = new Date(vacation.start_date);
        return new Date() < startDate;
      });
    } else {
      filterResult = VacationsCards;
    }

    if (buttonFavorites) {
      filterResult = filterResult.filter((vacation) => vacation.isFollowed);
    }

    setDisplayCards(filterResult);
  }, [valueFilter, VacationsCards, buttonFavorites]);


  useEffect(() => {
    data.jump(1);
  }, [displayCards]);



  const handleFavoriteChange = () => {
    SetbuttonFavorites(!buttonFavorites);
  };


  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };





  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ bgcolor: "white", color: "black" }}>
        <Grid container sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Grid item xs={10} sx={{ alignItems: "center", display: "flex", flexDirection: "column", pb: "2rem", mt: "2rem", borderRadius: '10px', mb: "2rem", width: "100%" }}>

            <Grid sx={{ alignItems: "center", display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%", padding: "1rem", justifyContent: "space-between", bgcolor: "#1976d2", borderRadius: '7px' }}>
              <Grid>
                <Pagination
                  sx={{
                    '& .MuiPaginationItem-root': { color: 'white' },
                    '& .MuiPaginationItem-root.Mui-selected': { color: '#0009' }
                  }}
                  color="secondary"
                  count={count}
                  size="large"
                  page={page}
                  shape="rounded"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "row-reverse", gap: "5px" }}>

                <BottomNavigation
                  showLabels
                  value={valueFilter}
                  onChange={async (event, newValue) => {
                    SetValueFilter(newValue)

                  }}
                  sx={{
                    flexGrow: 0.5, // Allow it to take more space dynamically
                    minWidth: 0, // Prevent it from overflowing when space is limited
                    '@media (max-width: 500px)': { // Media query for small screens (optional)
                      flexGrow: 1, // Ensures it expands well on small screens
                    },
                  }}
                >
                  <BottomNavigationAction label="Not started" icon={<RestoreIcon />} />
                  <BottomNavigationAction label="Active" icon={<AddTaskIcon />} />
                  <BottomNavigationAction label="All" icon={<AutoAwesomeMotionIcon />} />
                </BottomNavigation>

                {/* Second BottomNavigation (Favorites) */}
                <BottomNavigation
                  showLabels
                  value={buttonFavorites}
                  onChange={handleFavoriteChange}
                  sx={{
                    flexGrow: 0.2,

                    '& .MuiBottomNavigationAction-root': {
                      borderRadius: '10px',
                      color: 'white',
                      '&.Mui-selected': {
                        backgroundColor: '#ff4081',
                        color: '#fff',
                        border: '2px solid #ff4081',
                      },
                    },
                  }}
                >
                  <BottomNavigationAction value={true} label="Favorites" icon={<FavoriteIcon />} />
                </BottomNavigation>
              </Grid>

            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "30px", marginBottom: "2rem" }}>
              {isLoading ? <CircularProgress />
                : data.currentData().length !== 0 ?
                  <VacationsList vacations={data.currentData()}
                    usersFollow={usersFollow}
                    doSomething={
                      role
                        ? async (v: vacationCardUI): Promise<void> => {
                          seteditVacation(v)
                          navigate("/vacations/edit")
                          }
                        : async (v: vacationCardUI): Promise<void> => {
                            await toggleFollow(v);
                          }
                    }
                    doSomethingAdmin={(v: vacationCardUI) => {
                      handleClickOpenDialog()
                      SetIdToDelete(v.id)
                    }}
                  />
                  : <h1>No Data</h1>}

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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this vacation from the database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseDialog}>cancel</Button>
          <Button variant="contained" color="success" onClick={async () => {
            try {
              const result: any = await SendToApiDelete(token, idToDelete)
              handleCloseDialog()
              SetIdToDelete(NaN)
              if (result.data.message ===
                "Vacation deleted successfully") {
                const findindex = VacationsCards.findIndex(i => i.id === idToDelete)
                if (findindex !== -1) {
                  displayCards.splice(findindex, 1)
                }
              } else { alert("something went wrong with deleting the vacation") }
            } catch (error) {
              alert("something went wrong")
            }

          }} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>

  );
}
