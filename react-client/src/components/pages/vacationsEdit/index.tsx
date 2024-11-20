import { useMemo, useState } from 'react';
import { TextField, Button, Box, Typography, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { useAuth, useEditContext } from '../../../context';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { z } from "zod"
import { CircularProgress, } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { UpdateVactionApi } from './service';
import { DateValidationError } from '@mui/x-date-pickers/models';

const defaultTheme = createTheme();



const countrySchema = z.string().min(1);
const citySchema = z.string().min(1);
const descriptionSchema = z.string().min(1);
const priceSchema = z.number().min(1);
const ImageScheme = z.string().url()

export default function VacationForm() {
    const navigate = useNavigate();
    const { editVacation } = useEditContext()
    const { token } = useAuth()



    if (editVacation.id===undefined) {
        navigate("/vacations");
    }


    const [country, setCountry] = useState(editVacation.country);
    const [countryError, setCountryError] = useState({ isError: false, errorMessage: "" });
    const [city, setCity] = useState(editVacation.city);
    const [cityError, setCityError] = useState({ isError: false, errorMessage: "" });
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(editVacation.start_date));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(editVacation.end_date));
    const [description, setDescription] = useState(editVacation.description);
    const [descriptionError, setDescriptionError] = useState({ isError: false, errorMessage: "" });
    const [imageUrl, setImageUrl] = useState(editVacation.image_url);
    const [imageError, setImageError] = useState({ isError: false, errorMessage: "" });
    const [price, setPrice] = useState<number>(+editVacation.price);
    const [priceError, setPriceError] = useState({ isError: false, errorMessage: "" });
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<DateValidationError | null>(null);


    function isCountryValid() {
        const result = countrySchema.safeParse(country);
        if (result.success) {
            setCountryError({ isError: false, errorMessage: "" });
        } else {
            const errors = result?.error?.issues.map(e => e.message);
            setCountryError({ isError: true, errorMessage: errors.join(", ") });
        }

    }


    function isImageValid() {
        const result = ImageScheme.safeParse(country);
        if (result.success) {
            setImageError({ isError: false, errorMessage: "" });
        } else {
            const errors = result?.error?.issues.map(e => e.message);
            setImageError({ isError: true, errorMessage: errors.join(", ") });
        }
        
    }




    function isCityValid() {
        const result = citySchema.safeParse(city);
        if (result.success) {
            setCityError({ isError: false, errorMessage: "" });
        } else {
            const errors = result?.error?.issues.map(e => e.message);
            setCityError({ isError: true, errorMessage: errors.join(", ") });
        }
    }

    function isDescriptionValid() {
        const result = descriptionSchema.safeParse(description);
        if (result.success) {
            setDescriptionError({ isError: false, errorMessage: "" });
        } else {
            const errors = result?.error?.issues.map(e => e.message);
            setDescriptionError({ isError: true, errorMessage: errors.join(", ") });
        }
    }

    function isPriceValid() {
        console.log(price);



        const result = priceSchema.safeParse(price);
        console.log(result);

        if (result.success) {
            setPriceError({ isError: false, errorMessage: "" });
        } else {
            const errors = result?.error?.issues.map(e => e.message);
            setPriceError({ isError: true, errorMessage: errors.join(", ") });
        }
    }

    function isSubmitDisabled(): boolean {
        if (endDate<startDate) {

            return true;
        }

        if (!country || !price || !city || !description || !startDate || !endDate || !imageUrl) {

            return true;
        }
        if (countryError.isError || priceError.isError || cityError.isError || descriptionError.isError) {


            return true;
        }
        return false;
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const result= await UpdateVactionApi({
                id: editVacation.id,
                country: country,
                city: city,
                description: description,
                start_date: startDate?.toDate(),
                end_date: endDate?.toDate(),
                price: price,
                image_url: imageUrl
            }, token);
            console.log(result);
            navigate("/vacations");
        } catch (error: any) {
            alert(error.message);
            console.log(error.message);
            
        } finally {
            setIsLoading(false);
         
        }
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleImageUrlChange = (newUrl: string) => {
        setImageUrl(newUrl);
    };

    const errorMessage =useMemo(() => {
        switch (error) {
          
          case 'minDate': {
            return 'Please select a date after start date';
          }
    
          case 'invalidDate': {
            return 'Your date is not valid';
          }
    
          default: {
            return '';
          }
        }
      }, [error]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div
    style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundAttachment:"fixed",
        
        backgroundRepeat: 'no-repeat',
       
    }}
>
 

                <Grid container component="main" sx={{ bgcolor: "transparent", justifyContent: 'center', alignItems: 'center' ,minHeight: '100vh' }}>
                    
                    <Grid item xs={12} md={6} component={Paper} elevation={6} square sx={{ boxShadow: 3, width: "90%", maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', mt:"2rem",mb:"2rem"}}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                justifyContent: "center",
                                display: 'flex',
                                width: "100%",
                                background: "#1976d2",
                                color: "white",
                                padding: 2
                            }}
                        >
                            <Typography component="h2" variant="h4">
                                update card
                            </Typography>
                            <Avatar sx={{ bgcolor: 'white', marginLeft: 2 }}>
                                <AutoStoriesIcon sx={{ color: '#1976d2' }} />
                            </Avatar>
                        </Box>
                        <Box component="form" sx={{ mt: 1, p: 3, display: "flex", flexDirection: 'column', alignItems: "center", gap: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        onBlur={isCountryValid}
                                        helperText={countryError.errorMessage}
                                        error={countryError.isError}
                                        label="country"
                                        variant="standard"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        onBlur={isCityValid}
                                        helperText={cityError.errorMessage}
                                        error={cityError.isError}
                                        variant="standard"
                                        label="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Box
                                    component={Paper}
                                    sx={{
                                        backgroundImage: `url(${imageUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: 200,
                                        width: 400,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >

                                    <Button variant="contained" onClick={handleOpenDialog} color="primary" endIcon={<UploadFileIcon />}>
                                        change Image
                                    </Button>
                                    
                                </Box>
                                <Dialog open={openDialog} onClose={handleCloseDialog}>
                                    <DialogTitle>Enter Image URL</DialogTitle>
                                    <DialogContent >
                                        <TextField
                                         onBlur={isImageValid}
                                         helperText={imageError.errorMessage}
                                         error={imageError.isError}
                                            sx={{ mt: "10px" }}
                                            fullWidth
                                            label="Image URL"
                                            value={imageUrl}
                                            onChange={(e) => handleImageUrlChange(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenDialog(false)}>Add Image</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>


                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newDate) => setStartDate(newDate || startDate)}
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                     slotProps={{
                                        textField: {
                                          helperText:errorMessage,
                                        },
                                      }}
                                      onError={(newError) => setError(newError)}
                                        label="End Date"
                                        minDate={startDate}
                                        value={endDate}
                                        onChange={(newDate) => setEndDate(newDate || endDate)}
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                            </Grid>


                            <TextField
                                multiline
                                rows={3}

                                onBlur={isDescriptionValid}
                                helperText={descriptionError.errorMessage}
                                error={descriptionError.isError}
                                label="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth

                            />



                         

                            <TextField

                                onBlur={isPriceValid}
                                helperText={priceError.errorMessage}
                                error={priceError.isError}
                                label="price $"
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                                fullWidth
                                type="number"
                            />
                           <Grid container spacing={2}>
                          
                            <Grid  item xs={12} sm={6}>
                            {isLoading ? (
                                <LoadingLogin />
                            ) : (
                                <Button disabled={isSubmitDisabled()} variant="contained" onClick={handleSubmit} color="primary" fullWidth>
                                    Submit
                                </Button>
                            )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Button variant="contained" onClick={() => { navigate("/vacations"); }} color="error" fullWidth >
                                cancel
                            </Button>
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                </div>
                <CssBaseline />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

function LoadingLogin() {
    return <span><CircularProgress /> Please wait ...  </span>;
}

