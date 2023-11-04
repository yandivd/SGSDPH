import React from 'react';
import './stylesTablesModel.css'


const TableSolicitaAutoriza = ({ tittle, name, cargo, dependencia }) => {
    return (
        <table style={{ borderCollapse: 'collapse', width: '450px', padding: "20px"}} >
            <tbody>
                <tr>
                    <td className={'tablePrevizualizar'}>{tittle}</td>
                </tr>
                <tr>
                    <td className={'tablePrevizualizar'}>Firma</td>
                    <td className={'tablePrevizualizar'}></td>
                </tr>
                <tr>
                    <td className={'tablePrevizualizar'}>Nombre y Apellidos</td>
                    <td className={'tablePrevizualizar'}>{name}</td>
                </tr>
                <tr>
                    <td className={'tablePrevizualizar'}>Cargo:</td>
                    <td className={'tablePrevizualizar'}>{cargo}</td>
                </tr>
                <tr>
                    <td className={'tablePrevizualizar'}>Dependencia</td>
                    <td className={'tablePrevizualizar'}>{dependencia}</td>
                </tr>
            </tbody>

        </table>
    );
};

export default TableSolicitaAutoriza;
