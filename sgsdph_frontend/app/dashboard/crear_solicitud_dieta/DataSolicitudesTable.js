import React, {useEffect, useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import {
    ccosto_endpoint,
    solicitudes_endpoint,
    trabajadores_endpoint,
    unidad_organizativa_endpoint
} from "../../../constants/apiRoutes";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";


const DataSolicitudesTable = ({solicitudes}) => {
    const [products, setProducts] = React.useState(solicitudes);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect( () => {
        getDataTable()

    }, [router, dispatch, solicitudes])

    function agregarCampo(arreglo, nombre, ci) {
        console.log(nombre, ci)
        return arreglo.map(objeto => ({
            ...objeto,
            nombre: nombre,
            ci: ci
        }));
    }


    const getDataTable = async () => {
        var nuevoArreglo = [];

        for (const solicitud of solicitudes) {
            const id_trabajador = solicitud.trabajador;
            const id_cccontable = solicitud.c_contable;
            const id_unidad_organizativa = solicitud.unidad_organizativa;
            try {
                const response1 = await axios.get(
                    process.env.NEXT_PUBLIC_API_HOST + trabajadores_endpoint + id_trabajador + '/'
                );

                const nombre = response1.data.nombre;
                const ci = response1.data.ci;

                const response2 = await axios.get(
                    process.env.NEXT_PUBLIC_API_HOST + ccosto_endpoint + id_cccontable + '/'
                );

                const response3 = await axios.get(
                    process.env.NEXT_PUBLIC_API_HOST + unidad_organizativa_endpoint + id_unidad_organizativa + '/'
                );

                const c_contable = response2.data.name
                const unidad_organizativa =response3.data.name

                const objetoModificado = {
                    ...solicitud,
                    c_contable: c_contable,
                    unidad_organizativa: unidad_organizativa,
                    nombre: nombre,
                    ci: ci
                };
                nuevoArreglo.push(objetoModificado);
            } catch (error) {
                console.log(error);
            }
        }


        setProducts(nuevoArreglo);
    }

    const actionBodyTemplate = () => {
        return (
            <>
                <IconButton size="large" className="text-warning" >
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error">
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }



    return (
        <div className="card">
            <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="nombre" header="Nombre" sortable style={{ width: '20%' }}></Column>
                <Column field="ci" header="CI" sortable style={{ width: '25%' }}></Column>
                <Column field="unidad_organizativa" header="Unidad Organizativa" sortable style={{ width: '15%' }}></Column>
                <Column field="c_contable" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                <Column field="origen" header="Origen" sortable style={{ width: '25%' }}></Column>
                <Column field="destino" header="Destino" sortable style={{ width: '25%' }}></Column>
                <Column field="regreso" header="Regreso" sortable style={{ width: '25%' }}></Column>
                <Column field="fecha_inicio_dieta" header="Fecha inicio" sortable style={{ width: '25%' }}></Column>
                <Column field="fecha_final_dieta" header="Fecha fin" sortable style={{ width: '25%' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>
        </div>
    );
};

export default DataSolicitudesTable;