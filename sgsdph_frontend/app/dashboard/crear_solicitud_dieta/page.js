'use client'
import * as React from 'react';
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";
import {useEffect, useState} from "react";
import CreateSDModal from "./CreateSDModal";
import axios from "axios";
import {
    aperitivos_endpoint,
    autoriza_endpoint,
    cargo_presupuesto_endpoint,
    ccosto_endpoint,
    solicita_endpoint, solicitudes_endpoint, trabajadores_endpoint
} from "../../../constants/apiRoutes";
import DataSolicitudesTable from "./DataSolicitudesTable";

export default function CrearSolicitudDieta() {

    const [open, setOpen] = useState(false);
    const [solicitudes, setSolicitudes] = React.useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect( () => {
        getDataForm()

    }, [])

    const getDataForm = async () => {
        const unidad_organizativa = window.localStorage.getItem('unidad_organizativa');

        try {
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + solicitudes_endpoint + unidad_organizativa + '/'
            )
                .then(response => {
                    console.log('Esta es la response', response.data)
                    setSolicitudes((response.data));
                })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <div className='d-flex justify-content-end m-4'>
                <Button variant="contained" onClick={handleClickOpen}> + Agregar Solicitud</Button>
            </div>

            <CreateSDModal isOpen={open} handleClose={handleClose} setOpen={setOpen} solicitudes={solicitudes} />

            <p className={'text-secondary my-3 ms-2'}>Listado de solicitudes de dietas</p>
            <DataSolicitudesTable solicitudes={solicitudes} />
            <Button variant="contained"  color='success' >Generar modelo</Button>

        </div>
    );
}
