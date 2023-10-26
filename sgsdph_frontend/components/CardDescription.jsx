'use client'
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React, {useEffect} from "react";
import axios from "axios";
import {modelo_endpoint} from "../constants/apiRoutes";


const CardDescription = () => {
    const [pendientes, setPendientes] = React.useState('');
    const [archivadas, setArchiadas] = React.useState('');
    const [canceladas, setCanceladas] = React.useState([]);
    const [autorizadas, setAutorizadas] = React.useState('');

    const getModels = async () => {

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + modelo_endpoint
        )
            .then(response => {
                const data = response.data;

                setCanceladas( (data.filter(objeto => objeto.estado === "Cancelado") ));
                setPendientes(data.filter(objeto => objeto.estado === "PendienteSolicitar"  ));
                setArchiadas(data.filter(objeto => objeto.estado === "PendienteAnticipo" || objeto.estado === "Cancelado"  ));
                setAutorizadas(data.filter(objeto => objeto.estado === "PendienteAutorizo"  ));
            })
    }

    useEffect( () => {
        getModels();

    }, [])

    return (
        <div className='d-flex justify-content-between flex-wrap'>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes pendientes</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {pendientes.length}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes por autorizar</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {autorizadas.length}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Solicitudes archivadas</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        {archivadas.length}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Cantidad de canceladas</b>
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