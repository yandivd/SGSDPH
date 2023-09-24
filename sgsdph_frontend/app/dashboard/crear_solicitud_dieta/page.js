import * as React from 'react';
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";

export default function CrearSolicitudDieta() {

    return (
        <div>
            <div className='d-flex justify-content-end m-4'>

                <Button variant="contained" >Agregar Solicitud</Button>
            </div>


            <p className={'text-secondary my-3 ms-2'}>Listado de solicitudes de dietas</p>

            <BasicTable />
            <p>La tabla lleva previsualizar, imprimir </p>

            <Button variant="contained"  color='success' >Generar modelo</Button>

        </div>
    );
}
