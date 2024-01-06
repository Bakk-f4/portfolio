import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHref } from 'react-router-dom';

export default function ActionAreaCard({ nome, ultimaModifica, link_to }) {
    return (
        <Card sx={{ maxWidth: 345 }} >
            <CardActionArea href={link_to} target="_blank">
                <CardMedia
                    component="img"
                    height="60"
                    image='src\img\bakk-logo.png'
                    alt="bakk logo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nome.slice(0, 20)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ultimaModifica}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}