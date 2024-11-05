
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { homeCardUI } from './service';
import "./slick-slide.scss"


export default function MediaCard(data :homeCardUI) {
  
  return (
    <div  className="slick-slide">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ width:250, height: 140 }}
       
        
        image= {data.image_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.country}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {data.city}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}