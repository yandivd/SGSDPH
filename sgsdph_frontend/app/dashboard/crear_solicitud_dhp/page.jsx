'use client'
import React from 'react';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import CreateSDHPModal from "./CreateSDHPModal";
import CreateSDModal from "../crear_solicitud_dieta/CreateSDModal";
import {fetchSinToken} from "../../../helper/fetch";
import {modelo_endpoint, solicitudes_endpoint, solicitudesDPH_endpoint} from "../../../constants/apiRoutes";
import Swal from "sweetalert2";
import axios from "axios";
import DataSolicitudesTable from "../crear_solicitud_dieta/DataSolicitudesTable";
import DataSDPHTable from "./DataSDPHTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import {DialogActions} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {InputText} from "primereact/inputtext";
import {useRouter} from "next/navigation";

export default function CrearSolicitudDHP() {
    const [open, setOpen] = useState(false);
    const [openGenerateModelo, setOpenGenerateModelo] = useState(false);
    const [solicitudes, setSolicitudes] = React.useState([]);
    const [modelos, setModelos] = React.useState([]);
    const [refreshSolicitudes, setRefreshSolicitudes] = React.useState(false)
    const [length, setLength] = React.useState(null)
    const [rol, setRol] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(true);


    const handleRefreshSolicitudes = () => {
        setRefreshSolicitudes(!refreshSolicitudes)
    }
    const handleClickOpenGenerateModal = () => {
        setOpenGenerateModelo(!openGenerateModelo);
    }
    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleCreateModel = async () => {
        const firstSolicitud = solicitudes[0]
        const solicitudes_id = solicitudes.map(objeto => objeto.id);
        const name = window.localStorage.getItem('first_name');
        const last_name = window.localStorage.getItem('last_name');

        var fechaActual = new Date();

        var year = fechaActual.getFullYear();

        var gastos_comida = '';

        if(firstSolicitud.aperitivo.length > 0){
            gastos_comida = ' Gastos en';
            for (var it in firstSolicitud.aperitivo) {
                gastos_comida += ' ' + (firstSolicitud.aperitivo[it].nombre);
                if(it < (firstSolicitud.aperitivo.length - 1) ){
                    gastos_comida += ','
                }
            }
        }
        try {
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + modelo_endpoint
            )
                .then(response => {
                    setModelos(response.data);
                })
        } catch (error) {
            console.log(error)
        }

        const dataModel = {
            "tipo_model":2,
            "nombre": name + ' ' + last_name,
            "solicitante": firstSolicitud.solicitante.first_name + ' ' +  firstSolicitud.solicitante.last_name,
            "unidad_organizativa": firstSolicitud.unidad_organizativa.name,
            "c_contable": firstSolicitud.c_contable.name,
            "consec": ( modelos.length + 1 )+ '/' + year,
            "solicitudes": solicitudes_id,
            "parleg": (firstSolicitud.parleg === null ? ''  :  firstSolicitud.parleg.nombre + ' ' + firstSolicitud.parleg.apellidos),
            "autoriza": firstSolicitud.autoriza.first_name + ' ' + firstSolicitud.autoriza.last_name ,
            "cargo_presupuesto": firstSolicitud.cargo_presupuesto.account,
            "observaciones": firstSolicitud.observaciones + gastos_comida,
            "estado":"PendienteSolicitar",
            "telf_solicitante": firstSolicitud.solicitante.telf,
            "cargo_autoriza":firstSolicitud.autoriza.cargo,
            "dependencia_autoriza":firstSolicitud.autoriza.dependencia,
            "cargo_solicita": firstSolicitud.solicitante.cargo,
            "dependencia_solicita": firstSolicitud.solicitante.dependencia,
            "labor": firstSolicitud.labor
        }


        try {
            const resp = await fetchSinToken(modelo_endpoint, dataModel, "POST");
            const body = await resp.json();

            if (resp.status === 201) {
                Swal.fire('Exito', "Se ha creado correctamente", 'success');
                handleRefreshSolicitudes();

            }else{
                Swal.fire('Error', "Error del servidor", 'error');
            }
            handleClickOpenGenerateModal();

        } catch (error) {
            console.log(error)
        }

    }

    const getData = async () => {
        const unidad_organizativa = window.localStorage.getItem('unidad_organizativa');

        try {
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + solicitudesDPH_endpoint + 'no/' + unidad_organizativa + '/'
            )
                .then(response => {
                    setSolicitudes(response.data);
                    setLength(solicitudes.length);
                    setLoading(false);
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        setRol(window.localStorage.getItem('rol'));

        if(rol === 0 ){
            setShow(!show)
        }else{
            { rol !== '1' && rol !== '5' ?
                router.push('/login')
                :
                getData()
            }
        }

    }, [show, refreshSolicitudes])

    return (
        <div>
            <div className='d-flex justify-content-end my-2'>
                <Button variant="contained" onClick={handleClickOpen}>+ Agregar Solicitud</Button>            </div>

            <CreateSDHPModal isOpen={open}
                           handleClose={handleClickOpen}
                           solicitudes={solicitudes}
                           refreshFunction={handleRefreshSolicitudes}
                           length={length}
            />
            <p className={'text-secondary my-3 ms-2'}>Listado de solicitudes de dietas, hospedaje y pasaje</p>

            <DataSDPHTable
                solicitudes={solicitudes}
                refreshFunction={handleRefreshSolicitudes}
                loading={loading}
            />

            <Button variant="contained"  color='success' onClick={handleClickOpenGenerateModal} >Generar modelo</Button>
            <Dialog
                onClose={handleClickOpenGenerateModal}
                aria-labelledby="customized-dialog-title"
                open={openGenerateModelo}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClickOpenGenerateModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {
                    solicitudes.length > 0 && length !== null  ?
                        <div>
                            <DialogContent className='text-center'>
                                <h3 className='mt-4'>Estás seguro que desea generar el modelo</h3>
                            </DialogContent>

                            <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                                <Button autoFocus onClick={handleClickOpenGenerateModal} variant="contained" color='error'>
                                    Cancelar
                                </Button> <br/>
                                <Button variant="contained" color='success' onClick={handleCreateModel}>
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </div>

                        :
                        <div>
                            <DialogContent className='text-center'>
                                <ErrorOutlineIcon sx={{ fontSize: 60 }} color="action"  />
                                <h4 className='mt-4'>No se puede generar el modelo</h4>
                                <p>Para realizar está acción tienen que existir solicitudes.</p>
                            </DialogContent>
                        </div>
                }

            </Dialog>
        </div>
    );
}
