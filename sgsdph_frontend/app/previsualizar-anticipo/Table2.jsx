import React from 'react';

const test = [
    {
        "id": 1,
        "nombre": "Juan Pérez",
        "edad": 30,
        "saldo": 5000.00
    },
    {
        "id": 2,
        "nombre": "María Rodríguez",
        "edad": 25,
        "saldo": 7000.50
    },
    {
        "id": 3,
        "nombre": "Luis González",
        "edad": 35,
        "saldo": 6000.75
    },
    {
        "id": 4,
        "nombre": "Ana Martínez",
        "edad": 28,
        "saldo": 5500.25
    },
    {
        "id": 5,
        "nombre": "Carlos Sánchez",
        "edad": 32,
        "saldo": 8000.00
    }
]


const Table2 = () => {
    return (
        <div>
            <p>Desglose de dietas en efectivo CUP por trabajador</p>

            <table className={'tableAnticipo'}>

                <thead className={'p-3 text-center'}>
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
                {typeof test !== 'undefined' ? test.map((val, index) => (
                    <tr key={index}>
                        <td style={{ height: '0.21in' }}>{val.id}</td>
                        <td>{val.nombre}</td>
                        <td>{val.edad}</td>
                        <td>{val.saldo}</td>
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
                    <td>1234567</td>
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

export default Table2;