'use client'
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React, {useEffect} from "react";
import axios from "axios";
import {modelo_endpoint} from "../constants/apiRoutes";


const CardDescription = ({models}) => {
    const solicitudes = models.flatMap(modelo => modelo.solicitudes)
    const tipo_1 =  solicitudes.filter((item) => item.tipo_sol === 1);
    const tipo_2 =  solicitudes.filter((item) => item.tipo_sol === 2);
    const modelos_archivados = models.filter(objeto => objeto.estado === "PendienteAnticipo" || objeto.estado === "Archivada");
    const canceladas = models.filter((model) => model.estado === 'Cancelado');


    return (
        <div className='d-flex justify-content-between flex-wrap'>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes de Dietas</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {tipo_1.length}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes de DPH</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {tipo_2.length}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Modelos archivados</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {modelos_archivados.length}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Cantidad de cancelados</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {canceladas.length}
                    </Typography>
                </CardContent>
            </Card>
        </div>

    );
};

export default CardDescription;