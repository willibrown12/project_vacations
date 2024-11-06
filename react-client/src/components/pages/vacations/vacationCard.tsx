import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { vacationCardUI } from './vacationsList';
import { useUserContext } from '../../../context';

export default function VacationCard(props: vacationCardUI & { doSomething?: (p: vacationCardUI) => void }) {
    // Parse dates as Date objects
    const startDate = new Date(props.start_date);
    const endDate = new Date(props.end_date);
    const {role} =useUserContext()


    return (
        <Card sx={{ 
            maxWidth: 345, 
            maxHeight: 550, 
            borderRadius: 2, 
            boxShadow: 3, 
            bgcolor: "#f8f8f8"
        }}>
            <CardHeader 
                sx={{ bgcolor: "#1976d2", color: "white", padding: "8px 16px" }}
                title={props.country}
                subheader={props.city}
                subheaderTypographyProps={{ color: 'white', fontSize: "0.875rem" }}
                action={
                    role ? (
                      <IconButton aria-label="settings" sx={{ color: "white" }}>
                        <MoreVertIcon />
                      </IconButton>
                    ) : null
                  }
            />
            <CardMedia
                component="img"
                height="194"
                image={props.image_url}
                alt={`${props.country} - ${props.city}`}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ padding: "16px" , height: "200px"}}>
            <Typography variant="body2" color="text.secondary">
                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                    {props.description}
                </Typography>
               
            </CardContent>
            <CardActions disableSpacing sx={{ padding: "8px 16px", borderTop: "1px solid #e0e0e0" }}>
                <IconButton 
                disabled={role ? true : false}
                    aria-label="add to favorites" 
                    onClick={() => {
                        console.log(role);
                        
                        const { doSomething, ...restOfProps } = props;
                        if (typeof props?.doSomething === "function") {
                            props?.doSomething(restOfProps);
                        }
                    }}
                    sx={{ color: props.isFollowed ? 'red' : 'gray' }}
                >
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" sx={{ marginLeft: "4px" }}>
                    {props.followers_count}
                </Typography>
            </CardActions>
        </Card>
    );
}
