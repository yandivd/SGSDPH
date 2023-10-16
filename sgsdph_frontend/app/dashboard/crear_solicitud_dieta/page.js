'use client'
import * as React from 'react';
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";
import {useState} from "react";
import CreateSDModal from "./CreateSDModal";

export default function CrearSolicitudDieta() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className='d-flex justify-content-end m-4'>
                <Button variant="contained" onClick={handleClickOpen}> + Agregar Solicitud</Button>
            </div>

            <CreateSDModal isOpen={open} handleClose={handleClose} setOpen={setOpen} />

            <p className={'text-secondary my-3 ms-2'}>Listado de solicitudes de dietas</p>
            <BasicTable />
            <p>La tabla lleva editar, cencelar</p>

            <Button variant="contained"  color='success' >Generar modelo</Button>

        </div>
    );
}
