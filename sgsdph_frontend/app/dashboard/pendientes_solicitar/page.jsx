'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {modelo_detail_endpoint, modelo_endpoint, solicitudes_endpoint} from "../../../constants/apiRoutes";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import {InputText} from "primereact/inputtext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {DialogActions} from "@mui/material";
import Swal from "sweetalert2";
import {fetchSinToken} from "../../../helper/fetch";
import {useRouter} from "next/navigation";


export default function PendienteSolicitud() {
    const [models, setModels] = React.useState([]);
    const [globalFilter, setGlobalFilter] = useState('')
    const [openCancel, setOpenCancel] = React.useState(false);
    const [openSolicitar, setOpenSolicitar] = React.useState(false);
    const [id, setId] = React.useState('');
    const router = useRouter();

    const getModels = async () => {

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + modelo_endpoint
        )
            .then(response => {
                const data = response.data.filter(objeto => objeto.estado === "PendienteSolicitar" );
                setModels(data);
            })
    }

    const confirmCancelModel = (idSolicitud) =>{
        setId(idSolicitud)
        handleOpenCancel()
    }

    const confirmSolicitar = (idSolicitud) =>{
        setId(idSolicitud)
        handleOpenSolicitar()
    }


    const handleOpenCancel = () => {
        setOpenCancel(!openCancel);
    };

    const handleOpenSolicitar = () => {
        setOpenSolicitar(!openSolicitar);
    };

    const handleViewModel = (id) => {
        router.push(`/previsualizar-model/${id}`);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-primary" onClick={() => handleViewModel(rowData.id)}>
                    <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="success" onClick={() => confirmSolicitar(rowData.id)}>
                    <CheckIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error" onClick={() => confirmCancelModel(rowData.id)}>
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }

    const handleChangeState = async (state) => {
        const endpoint = modelo_detail_endpoint + id +'/'

        const data = {
            estado: state
        }

        try {
            const resp = await fetchSinToken(endpoint, data, "PATCH");

            if (resp.status === 200) {
                Swal.fire('Exito', "Operación finaliza con éxito", 'success');
            }else{
                Swal.fire('Error', "Error del servidor", 'error');
            }

        } catch (error) {
            console.log(error)
        }

        if(openCancel){
            handleOpenCancel();
        }

        if(openSolicitar){
            handleOpenSolicitar();
        }

    }

    useEffect( () => {
        getModels();

    }, [models])



    return (
        <div>

            <p className={'text-secondary my-4 ms-2'}>Listado de modelos pendientes a solitar</p>
            <div>
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Filtrar..."
                    sx={{ mb:3 }}
                />
            </div>

            <br/>

            <DataTable value={models}
                       paginator rows={5}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       tableStyle={{ minWidth: '50rem' }}
                       globalFilter={globalFilter}
            >
                <Column
                    field="tipo_model"
                    header="Tipo de modelo"
                    sortable
                    style={{ width: '30%' }}
                    body={(rowData) => {
                        if (rowData.tipo_model === 1) {
                            return 'Dieta';
                        } else {
                            return 'Dieta, Pasaje y Hospedaje';
                        }
                    }}
                ></Column>
                <Column field="consec" header="Consecutivo" sortable style={{ width: '25%' }}></Column>
                <Column field="nombre" header="Creador" sortable style={{ width: '15%' }}></Column>
                <Column field="unidad_organizativa" header="Unidad Organizativa" sortable style={{ width: '25%' }}></Column>
                <Column field="c_contable" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                <Column field="cargo_presupuesto" header="Cargo Presupuesto" sortable style={{ width: '25%' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>

            <Dialog
                onClose={handleOpenCancel}
                aria-labelledby="customized-dialog-title"
                open={openCancel}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleOpenCancel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent className='text-center'>
                    <ErrorOutlineIcon sx={{ fontSize: 60 }} color="action"  />
                    <h4 className='mt-4'>Estás seguro de cancelar este modelo?</h4>
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button autoFocus onClick={handleOpenCancel} variant="contained" color='error'>
                        Cancelar
                    </Button> <br/>
                    <Button onClick={() => handleChangeState('Cancelado')} variant="contained">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                onClose={handleOpenSolicitar}
                aria-labelledby="customized-dialog-title"
                open={openSolicitar}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleOpenSolicitar}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent className='text-center'>
                    <h4 className='mt-4'>Estás seguro de solicitar este modelo?</h4>
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button variant="contained" >
                        Firmar
                    </Button> <br/>
                    <Button variant="contained"
                            color='success'
                            onClick={() => handleChangeState('PendienteAutorizo')}>
                        Solicitar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
        