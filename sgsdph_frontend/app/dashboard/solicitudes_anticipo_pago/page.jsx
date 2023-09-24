import * as React from 'react';
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";

export default function SolicitudesAnticipoPago() {

    return (
        <div>
            <div className='d-flex justify-content-end m-4'>
                <Button variant="contained"  color='success' >Autorizar anticipo</Button>
            </div>


            <p className={'text-secondary my-3 ms-2'}>Listado de modelos pendientes a anticipo de pago</p>

            <BasicTable />
            <p>La tabla lleva previsualizar</p>
        </div>
    );
}
