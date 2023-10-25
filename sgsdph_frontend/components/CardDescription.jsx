'use client'
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React from "react";


const CardDescription = () => {
    return (
        <div className='d-flex justify-content-between flex-wrap'>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes pendientes</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        237
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes por aprobar</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        145
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes archivadas</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        425
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Cantidad de canceladas</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        687
                    </Typography>
                </CardContent>
            </Card>
        </div>

    );
};

export default CardDescription;