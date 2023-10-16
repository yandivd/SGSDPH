'use client'
import * as React from 'react';
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";
import {useState} from "react";
import CreateSDModal from "../crear_solicitud_dieta/CreateSDModal";
import CreateSDHPModal from "./CreateSDHPModal";

export default function CrearSolicitudDHP() {

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
                <Button variant="contained" onClick={handleClickOpen}>+ Agregar Solicitud</Button>
            </div>

            <CreateSDHPModal isOpen={open} handleClose={handleClose} setOpen={setOpen} />

            <p className={'text-secondary my-3 ms-2'}>Listado de solicitudes de dietas, hospedaje y pasaje</p>
            <BasicTable />
            <p>La tabla lleva editar, cencelar</p>

            <Button variant="contained"  color='success' >Generar modelo</Button>
        </div>
    );
}
