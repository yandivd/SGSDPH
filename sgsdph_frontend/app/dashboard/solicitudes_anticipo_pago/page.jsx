'use client'
import React, {useState} from 'react';
import axios from "axios";
import {modelo_endpoint} from "../../../constants/apiRoutes";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import {useEffect} from "react";
import {InputText} from "primereact/inputtext";
import {useRouter} from "next/navigation";


export default function SolicitudesAnticipoPago() {
    const [models, setModels] = React.useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const router = useRouter();
    const [rol, setRol] = React.useState(0);
    const [show, setShow] = React.useState(false);


    const handleViewModel = (id) => {
        router.push(`/previsualizar-model/${id}`);
    }

    const getModels = async () => {

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + modelo_endpoint
        )
            .then(response => {
                const data = response.data.filter(objeto => objeto.estado === "PendienteAnticipo" );
                setModels(data);
            })
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-primary" onClick={() => handleViewModel(rowData.id)}>
                    <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="success" >
                    <CheckIcon fontSize="inherit" />
                </IconButton>
            </>
        )
    }

    useEffect( () => {
        setRol(window.localStorage.getItem('rol'));

        if(rol === 0 ){
            setShow(!show)
        }else{
            { rol !== '4' && rol !== '5' ?
                router.push('/login')
                :
                getModels()
            }
        }

    }, [show])

    return (
        <div>
            <div className={'d-flex align-items-end justify-content-between mt-4'}>
                <p className={'text-secondary ms-2'}>Listado de modelos pendientes a anticipo de pago</p>

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
        </div>
    );
}
