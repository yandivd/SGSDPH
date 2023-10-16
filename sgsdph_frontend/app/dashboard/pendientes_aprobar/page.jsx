import * as React from 'react';
import Button from "@mui/material/Button";
import BasicTable from "../../../components/TableMine";

export default function PendientesAprobar() {

    return (
        <div>
            <p className={'text-secondary my-3 ms-2'}>Listado de modelos pendientes a autorizo</p>

            <BasicTable />
            <p>La tabla lleva previsualizar, autorizar, imprimir </p>
        </div>
    );
}
