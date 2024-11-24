
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CssBaseline, Grid } from '@mui/material';

export default function AccordionExpandIcon() {
    
 

    return (
        <Grid
            container
            sx={{
                height: "100vh",
                paddingTop: "30px",
                paddingBottom: "30px",
                gap: 4,
                bgcolor: "white",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
            }}
        >
            <Grid item sm={10}
             sx={{
                flexDirection:"column",
               display:"flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
            }}>
              
              <Typography sx={{mb:"20px"}} component="h1" variant="h2">About us</Typography>

              <Grid sx={{ alignItems: "center", display: "flex", width: "100%", padding: "1rem", justifyContent: "center", bgcolor: "#1976d2", borderRadius: '7px' }}>
      
      <Typography  variant="h6" sx={{color:"white"}}>
      I have developed a full-stack web application using MySQL, Express API, and React. The application allows users to interact with vacation data and offers various features depending on user roles. It includes a secure API for managing data and a responsive client-side interface built with React and Material-UI.
      </Typography>
      </Grid>
                   
                   <Accordion>
        <AccordionSummary
         expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography  variant="h5">Database</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  variant="h6">
          The database is built with MySQL and managed through MySQL Workbench. It consists of three main tables: locations, users, and followers. These tables are linked via foreign key  using the IDs of locations and users. The locations table stores information about different vacation spots, the users table contains user details, and the followers table tracks which users follow which locations.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography  variant="h5">API</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  variant="h6">
          The API is a TypeScript-based project using Express. It exposes several routes, some of which are protected by middleware requiring a valid token for access. The API connects to the MySQL database and executes various queries to retrieve, update, and delete data. Operations supported include POST, GET, PUT, and DELETE. The API uses Zod for data validation to ensure incoming data is properly formatted before it is inserted into the database.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography  variant="h5">Client</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography  variant="h6">
          The client is built using React and Material-UI (MUI) for a sleek and modern design. It features a routing system with protected routes, ensuring that only authenticated users with valid tokens can access certain parts of the application. Admin users have enhanced privileges, such as the ability to delete or edit vacation data and view statistical information.
          </Typography>
        </AccordionDetails>
      </Accordion>
            </Grid>
            <CssBaseline />
        </Grid>)
}
