import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="90"
                    image='src\img\bakk-logo.png'
                    alt="bakk logo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Bakk
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bakks ....
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}