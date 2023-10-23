import React from 'react';

const TableSolicitaAutoriza = ({ data, tittle, name, cargo, dependencia }) => {
    return (
        <table style={{ borderCollapse: 'collapse', width: '450px', padding: "20px"}} >
            <tbody>
                <tr>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>{tittle}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>Firma</td>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}></td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>Nombre y Apellidos</td>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>{name}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>Cargo:</td>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>{cargo}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>Dependencia</td>
                    <td style={{ border: '1px solid #000', fontWeight: 'normal' }}>{dependencia}</td>
                </tr>
            </tbody>

        </table>
    );
};

export default TableSolicitaAutoriza;
