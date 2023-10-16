import * as React from 'react';
import BasicTable from "../../../components/TableMine";

export default function SolicitudesCanceladas() {

    return (
        <div>
            <p className={'text-secondary my-3 ms-2'}>Listado de modelos cancelados</p>

            <BasicTable />

            <p>La tabla lleva previsualizar</p>

        </div>
    );
}
