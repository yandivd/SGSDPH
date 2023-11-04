import React from 'react';
import styles from '/app/previsualizar-anticipo/TableTrabajadores.module.css'


const TableTrabajadores = ({anticipo}) => {
    return (
        <div className={'mt-4'}>
            <p>Desglose de dietas en efectivo CUP por trabajador</p>

            <table className={ styles.tableAnticipoTrabajador}>
                <thead className={'p-3'}>
                    <tr>
                        <th style={{ width: '0.76in', height: '0.42in' }}>No. Anticipo</th>
                        <th style={{ width: '2.49in', height: '0.42in' }}>Nombre del Trabajador</th>
                        <th style={{ width: '1.86in', height: '0.42in' }}>Dias estimados de viajes</th>
                        <th style={{ width: '1.63in', height: '0.42in' }}>Importe Dieta Entregada</th>
                        <th style={{ width: '1.86in', height: '0.42in' }}>Dias reales de viaje</th>
                        <th style={{ width: '1.19in', height: '0.42in' }}>Importe Dieta Utilizada</th>
                        <th style={{ width: '1.23in', height: '0.42in' }}>Importe Dieta Devuelta</th>
                        <th style={{ width: '1.10in', height: '0.42in' }}>Salida Real</th>
                        <th style={{ width: '1.09in', height: '0.42in' }}>Regreso Real</th>
                    </tr>
                </thead>


                <tbody>
                {typeof anticipo.modelo.solicitudes !== 'undefined' ? anticipo.modelo.solicitudes.map((val, id) => (
                    <tr key={id}>
                        <td style={{ height: '0.21in' }}>{val.id}</td>
                        <td>{val.trabajador.nombre} {val.trabajador.apellidos}</td>
                        <td>{val.dias_estimados}</td>
                        <td>{val.importe_dieta}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )) : ''}
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>{anticipo.total}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>

            </table>
        </div>
    );
};

export default TableTrabajadores;