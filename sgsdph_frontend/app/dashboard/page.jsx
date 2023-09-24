'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import CardDescription from "../../components/CardDescription";
import BasicTable from "../../components/TableMine";
import CreateSolicitudModal from "../../components/CreateSolicitudModal";
import {useState} from "react";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CardDescription />

            <div className='d-flex justify-content-end m-2'>
                <Button variant="contained" onClick={handleClickOpen}>+ Agregar Solicitud</Button>
            </div>

            <CreateSolicitudModal isOpen={open} handleClose={handleClose} setOpen={setOpen} />

            <Typography className={'text-secondary my-2 ms-2'}>Listado de Soliciudes de Dietas</Typography>
            <BasicTable />

        </div>

    );
}
