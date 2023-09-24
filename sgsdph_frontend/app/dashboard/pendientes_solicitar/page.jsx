'use client'
import React from "react";
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";

export default function PendienteSolicitud() {


    return (
        <div>

            <div className='d-flex justify-content-end m-4'>
                <Button variant="contained"  color='success' >Solicitar modelo</Button>
            </div>


            <p className={'text-secondary my-3 ms-2'}>Listado de modelos pendientes a solitar</p>

            <BasicTable />
            <p>La tabla lleva previsualizar y cancelar</p>

        </div>
    )
}
        