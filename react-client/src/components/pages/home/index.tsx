import { Button, CircularProgress, CssBaseline, Grid } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { homeCardUI, SendToApiHome } from "./service";
import MediaCard from "./createCarouselCard";
import AspectRatio from '@mui/joy/AspectRatio';
import { useNavigate } from "react-router-dom";
import Buttonjoy from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

import  backgroundImage from "/images/backroundImage.jpg";
import { useAuth } from "../../../context";




export function Home() {
  const navigate = useNavigate();

  const { token } = useAuth(); 
     const [homeCards, sethomeCards] = useState<Array<homeCardUI>>([])
      const [isLoading, setIsLoading] = useState(true)
     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


     
     
     
      useEffect(() => {
        setIsLoggedIn(!!token);
      }, [token]);
    
    

    useEffect(() => {
        let isSetState = true
        async function tableStart() {
          try {
            setIsLoading(true)
            const home: any = await SendToApiHome()
            if (isSetState) {
    
                
           
                sethomeCards(home)
           
            }
    
          } catch (error) {
            alert(error)
          } finally {
            setIsLoading(false)
          }
        }
        tableStart()
        return () => {
          isSetState = false;
        }
      }, [])
    
    



      const settings = {
        className: "center",
      
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        swipeToSlide: true,
        afterChange: function (index: number) {
          console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
        },
        responsive: [
          {
            breakpoint: 2200, 
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1800,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1024, 
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600, 
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          }
        ]
      };

  return (
    <Grid
      container
    
      sx={{
        height:" 100vh",
        paddingTop:"50px",
        paddingBottom:"50px",
       gap:4,
        bgcolor: "white",
      
        justifyContent: "center",
        alignItems: "center",
        color:"black",
       
      }}
    >
    
    {isLoggedIn?"":<Grid
          xs={12} md={10}
        item
        sx={{
          marginTop:"50px",
        
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{width:"90%" ,backgroundImage: `linear-gradient(20deg, rgba(255, 255, 255,1) 30%, rgba(8, 8, 37, 0) 100%), url(${backgroundImage})`, backgroundSize: 'cover',backgroundPosition: 'center' }} variant="outlined">
       
        <CardContent>
         <h2>Don't have an account</h2>
          <Typography>Create one now to enjoy special benefits that will enhance your vacations!</Typography>
        </CardContent>
        <div style={{width:"100%", display:"flex",justifyContent:"flex-end"}}> <Button
              onClick={() => navigate("/register")}
              variant="contained" 
             
            >
              Join us
            </Button></div>
            
      </Card> 
        
      </Grid>}
      <Grid
      item
      xs={12} md={10}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       {isLoading? <LoadingLogin/>:<div style={{ width: "100%", maxWidth: "90%"}}>
          <h1>Popular places</h1>
          <Slider {...settings}>
      {homeCards.map((c) => (
        <MediaCard key={c.image_url} {...c} />
      ))}
    </Slider>
          <div style={{display:"flex" ,width: "100%", justifyContent:"flex-end"}}>
          <Button  onClick={() => navigate('/vacations')} >go to vacations</Button>
          </div>
        </div>}
        
      </Grid>
      <Grid   xs={12} md={10}  item sx={{justifyContent: "center",alignItems: "center",display:"flex"}}>
      
      <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        height: "100%",
        textAlign: 'center',
        maxWidth: '100%',
       
       
      }}
    >
      <CardOverflow
        variant="solid"
        color="primary"
        sx={{
          flex: '0 0 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 'var(--Card-padding)',
          gap: 8,
        }}
      >
        <Typography textColor="#fff" sx={{ fontSize: 'xl4', fontWeight: 'xl' }}>
        ✆
        </Typography>
        <Typography textColor="primary.200">
        Need to contact us? We're here to help!
        </Typography>
        <Buttonjoy
          variant="outlined"
          onClick={() => navigate("/aboutus")}
          sx={{
            color:"white",
            '--variant-borderWidth': '2px',
            borderRadius: 40,
            borderColor: 'primary.500',
            mx: 'auto',
          }}
        >
          See about us
        </Buttonjoy>
      </CardOverflow>
      <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
        <AspectRatio ratio="19/8" objectFit="contain" variant="plain">
          <img
            alt=""
            src="https://static.vecteezy.com/system/resources/previews/006/409/485/original/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg"
          />
        </AspectRatio>
        <CardContent>
          <Typography level="title-lg">Need Some Help?</Typography>
          <Typography sx={{ fontSize: 'sm', mt: 0.5 }}>
          Hopefully, we have the answers for you in our FAQ
          </Typography>
        </CardContent>
       
      </CardContent>
    </Card>

      </Grid>
      <CssBaseline />
    </Grid>
    
  );
}

function LoadingLogin() {
  return <span><CircularProgress /> Please wait ...</span>;
}