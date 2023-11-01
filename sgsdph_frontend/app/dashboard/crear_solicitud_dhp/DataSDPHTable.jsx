import React, {useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {solicitudes_endpoint} from "../../../constants/apiRoutes";
import axios from "axios";
import Swal from "sweetalert2";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import EditSDModal from "../crear_solicitud_dieta/EditSDModal";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import EditSDPHModal from "./EditSDPHModal";
import {InputText} from "primereact/inputtext";

const DataSdphTable = ({solicitudes, refreshFunction}) => {
    const [products, setProducts] = React.useState(solicitudes);
    const [productToEdit, setProductToEdit] = React.useState([]);
    const [globalFilter, setGlobalFilter] = useState('')
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [id, setId] = React.useState('');

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-warning" onClick={() => confirmEditProduct(rowData.id)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error" onClick={() => confirmDeleteProduct(rowData.id)}>
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete);
    };

    const handleOpenEdit = () => {
        setOpenEdit(!openEdit);
    };

    const confirmDeleteProduct = (idSolicitud) =>{
        setId(idSolicitud)
        handleOpenDelete()
    }
    const confirmEditProduct = (idSolicitud) =>{
        const _products = products.filter((val) => val.id === idSolicitud)

        setProductToEdit(_products[0])
        handleOpenEdit()
    }

    const handleDeleteSolicitud = async () => {
        const endpoint = solicitudes_endpoint + id + '/';
        const _products = products.filter((val) => val.id !== id)
        try{
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_HOST + endpoint)
            if (response.status !== 204) {
                return null
            }
            setProducts(_products);
            handleOpenDelete();
            refreshFunction();
            await Swal.fire('Exito', "Se ha eliminado correctamente", 'success');

        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        const getData = () => {
            setProducts(solicitudes)
        }

        getData()


    }, [solicitudes])

    return (
        <div className="card">
            <div className={'p-2'}>
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Filtrar..."
                    sx={{ mb:3 }}
                />
            </div>
            <DataTable value={products}
                       paginator rows={5}
                       rowsPerPageOptions={[5, 10, 25, 50]}
                       tableStyle={{ minWidth: '50rem' }}
                       globalFilter={globalFilter}
            >
                <Column field="trabajador.nombre" header="Nombre" sortable style={{ width: '20%' }} body={(products) => (
                    <div>{products.trabajador.nombre} {products.trabajador.apellidos}</div>
                )}></Column>
                <Column field="trabajador.ci" header="CI" sortable style={{ width: '25%' }}></Column>
                <Column field="unidad_organizativa.name" header="Unidad Organizativa" sortable style={{ width: '15%' }}></Column>
                <Column field="c_contable.name" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                <Column field="origen" header="Origen" sortable style={{ width: '25%' }}></Column>
                <Column field="destino" header="Destino" sortable style={{ width: '25%' }}></Column>
                <Column field="regreso" header="Regreso" sortable style={{ width: '25%' }}></Column>
                <Column field="fecha_inicio_dieta" header="Fecha inicio" sortable style={{ width: '25%' }}></Column>
                <Column field="fecha_final_dieta" header="Fecha fin" sortable style={{ width: '25%' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>

            <Dialog
                onClose={handleOpenDelete}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                </DialogTitle>



                <IconButton
                    aria-label="close"
                    onClick={handleOpenDelete}
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
                    <h4 className='mt-4'>Estás seguro de eliminar está dieta?</h4>
                    <p>Está acción no se puede deshacer.</p>
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button autoFocus onClick={handleOpenDelete} variant="contained" color='error'>
                        Cancelar
                    </Button> <br/>
                    <Button onClick={handleDeleteSolicitud} variant="contained">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

            <EditSDPHModal isOpen={openEdit}
                         handleClose={handleOpenEdit}
                         solicitudes={productToEdit}
                         refreshFunction={refreshFunction}
            />

        </div>
    );
};

export default DataSdphTable;