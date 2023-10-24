'use client'
import React from 'react';
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

export default function PendientesAprobar() {
    const [models, setModels] = React.useState([]);

    const getModels = async () => {

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + modelo_endpoint
        )
            .then(response => {
                const data = response.data.filter(objeto => objeto.estado === "PendienteAutorizo" );
                setModels(data);
            })
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-primary">
                    <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="success">
                    <CheckIcon fontSize="inherit" />
                </IconButton>
            </>
        )
    }

    useEffect( () => {
        getModels();

    }, [])

    return (
        <div>
            <p className={'text-secondary my-3 ms-2'}>Listado de modelos pendientes a autorizo</p>

            <DataTable value={models} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="consec" header="Consecutivo" sortable style={{ width: '25%' }}></Column>
                <Column field="nombre" header="Creador" sortable style={{ width: '15%' }}></Column>
                <Column field="solicitante" header="Solicitante" sortable style={{ width: '25%' }}></Column>
                <Column field="unidad_organizativa" header="Unidad Organizativa" sortable style={{ width: '25%' }}></Column>
                <Column field="c_contable" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                <Column field="cargo_presupuesto" header="Cargo Presupuesto" sortable style={{ width: '25%' }}></Column>
                <Column field="autoriza" header="Autoriza" sortable style={{ width: '25%' }}></Column>
                <Column field="observaciones" header="observaciones" sortable style={{ width: '25%' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>
        </div>
    );
}
