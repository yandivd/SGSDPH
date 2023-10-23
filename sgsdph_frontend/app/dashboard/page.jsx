'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import CardDescription from "../../components/CardDescription";
import CreateSolicitudModal from "../../components/CreateSolicitudModal";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {every_solicituds_endpoint} from "../../constants/apiRoutes";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'

export default function BasicCard() {
    const [open, setOpen] = useState(false);
    const [everySolicitudes, setEverySolicitudes] = useState([]);

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const getData = async () => {
        try {
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + every_solicituds_endpoint
            )
                .then(response => {
                    console.log(response.data)
                    setEverySolicitudes(response.data);
                })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {

        getData()

    }, [])


    return (
        <div>
            <CardDescription />

            <div className='d-flex justify-content-end m-2'>
                <Button variant="contained" onClick={handleClickOpen}>+ Agregar Solicitud</Button>
            </div>

            <CreateSolicitudModal isOpen={open} handleClose={handleClickOpen} setOpen={setOpen} />

            <Typography className={'text-secondary my-2 ms-2'}>Listado de Soliciudes de Dietas</Typography>

            <DataTable value={everySolicitudes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="id" sortable style={{ width: '25%' }}></Column>
                <Column field="trabajador.nombre" header="Nombre" sortable style={{ width: '20%' }} body={(everySolicitudes) => (
                    <div>{everySolicitudes.trabajador.nombre} {everySolicitudes.trabajador.apellidos}</div>
                )}></Column>
                <Column field="trabajador.ci" header="CI" sortable style={{ width: '25%' }}></Column>
                <Column field="unidad_organizativa.name" header="Unidad Organizativa" sortable style={{ width: '15%' }}></Column>
                <Column field="c_contable.name" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                <Column field="origen" header="Origen" sortable style={{ width: '25%' }}></Column>
                <Column field="destino" header="Destino" sortable style={{ width: '25%' }}></Column>
                <Column field="regreso" header="Regreso" sortable style={{ width: '25%' }}></Column>
                <Column field="fecha_inicio_dieta" header="Fecha inicio" sortable style={{ width: '25%' }}></Column>
                <Column field="fecha_final_dieta" header="Fecha fin" sortable style={{ width: '25%' }}></Column>
            </DataTable>

        </div>

    );
}

