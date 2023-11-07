import React from 'react';
import './stylesTablesModel.css'
import Image from "next/image";
import { formatDate } from '../../utils/formatDate';

const TableDataAll = ({model}) => {
    const solicitudes = model.solicitudes;

    return (
        <div>
            <table className={'tableLarge'}>
                <thead>
                    <tr>
                        <th style={{ width: '0.6cm', height: '0.5cm' }}>(6)</th>
                        <th style={{ width: '3.8cm', height: '0.5cm' }}>(7)</th>
                        <th style={{ width: '2.2cm', height: '0.5cm' }}>(8)</th>
                        <th style={{ width: '1.4cm', height: '0.5cm' }}>(9)</th>
                        <th style={{ width: '1.5cm', height: '0.5cm' }}>(10)</th>
                        <th
                            style={{
                                width: '1.7cm',
                                height: '0.5cm',
                            }}
                            rowSpan={2}
                            colSpan={3}
                        >
                            Provincias
                        </th>
                        <th
                            style={{
                                width: '1.7cm',
                                height: '0.5cm',
                            }}
                            rowSpan={2}
                            colSpan={2}
                        >
                            Dieta
                        </th>
                        <th
                            style={{
                                width: '1.7cm',
                                height: '0.5cm',
                            }}
                            rowSpan={2}
                            colSpan={2}
                        >
                            Hospedaje
                        </th>
                        <th
                            style={{
                                width: '1.7cm',
                                height: '0.5cm',
                            }}
                            rowSpan={2}
                            colSpan={2}
                        >
                            Pasaje
                        </th>
                        <th rowSpan={2} colSpan={2}>
                            Via Transportacion
                        </th>
                    </tr>
                    <tr>
                        <th style={{ width: '0.6cm', height: '0.5cm' }}></th>
                        <th style={{ width: '3.8cm', height: '0.5cm' }}></th>
                        <th style={{ width: '2.2cm', height: '0.5cm' }} rowSpan={2}>Carne Identidad</th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }} rowSpan={2}>Unidad Organizativa</th>
                        <th
                            style={{
                                width: '1.7cm',
                                height: '0.5cm',
                            }}
                            rowSpan={2}
                        >
                            C. Contable que entrega anticipo
                        </th>
                    </tr>
                    <tr>
                        <th style={{ width: '0.6cm', height: '0.5cm' }}>No</th>
                        <th style={{ width: '3.8cm', height: '0.5cm' }}>
                            Nombre y Apellidos
                        </th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }}>Origen(11)</th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }}>Destino(12)</th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }}>Regreso(13)</th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }}>Desde(14)</th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }}>Hasta(15)</th>
                        <th style={{ width: '1.5cm', height: '0.5cm' }}>Entrada(16)</th>
                        <th style={{ width: '1.5cm', height: '0.5cm' }}>Salida(17)</th>
                        <th style={{ width: '1cm', height: '0.5cm' }}>Ida(18)</th>
                        <th style={{ width: '1.7cm', height: '0.5cm' }}>Regreso(19)</th>
                        <th>Ida(20)</th>
                        <th>Regreso(21)</th>
                    </tr>
                </thead>

                <tbody>
                    {typeof solicitudes !== 'undefined' ? model.solicitudes.map((val, index) => {
                        val.fecha_inicio_dieta = formatDate(val.fecha_inicio_dieta)
                        val.fecha_final_dieta = formatDate(val.fecha_final_dieta)
                        val.fecha_inicio_hosp = formatDate(val.fecha_inicio_hosp)
                        val.fecha_final_hosp = formatDate(val.fecha_final_hosp)
                        val.fecha_inicio_pasaj = formatDate(val.fecha_inicio_pasaj)
                        val.fecha_final_pasaj = formatDate(val.fecha_final_pasaj)
                        return(
                        <tr style={{ textAlign: 'center' }} key={index}>
                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ width: '150px' }}>{val.trabajador.nombre} {val.trabajador.apellidos}</td>
                            <td>{val.trabajador.ci}</td>
                            <td>{val.unidad_organizativa.name}</td>
                            <td style={{ width: '80px' }}>{val.c_contable.name}</td>
                            <td>{val.origen}</td>
                            <td>{val.destino}</td>
                            <td>{val.regreso}</td>
                            <td>{val.fecha_inicio_dieta}</td>
                            <td>{val.fecha_final_dieta}</td>
                            <td>{val.fecha_inicio_hosp}</td>
                            <td>{val.fecha_final_hosp}</td>
                            <td>{val.fecha_inicio_pasaj}</td>
                            <td>{val.fecha_final_pasaj}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}) : ''}

                    <tr>
                        <td colSpan={16} style={{ height: '0.7cm', textAlign: 'left' }}>
                            LABOR A REALIZAR: {model.labor}
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={7} style={{ textAlign: 'left', height: '0.4cm' }}>
                            PERSONA AUTORIZADA A RECIBIR Y LIQUIDAR EL EFECTIVO DEL GRUPO(23)
                        </th>
                        <td colSpan={9} style={{ textAlign: 'left', height: '0.4cm' }}>
                            OBSERVACIONES(24):
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'left'}} colSpan={7}>NOMBRE Y APELLIDOS: {model.parleg}</td>
                        <td colSpan={9} rowSpan={2} style={{ textAlign: 'left' }}>
                            {model.observaciones}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'left', height: '0.8cm' }} >FIRMA:</td>
                    </tr>
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'left', height: '0.3cm' }}>
                            CONFECCIONADO POR (25):
                        </td>
                        <td colSpan="7" style={{ textAlign: 'left', height: '0.3cm' }}>
                            RECIBIDO POR (26):
                        </td>
                        <td rowSpan="4" colSpan="2" style={{ height: '0.3cm' }}>
                            CONSEC {model.consec}
                        </td>
                    </tr>


                    <tr>
                        <td colSpan="7" style={{ textAlign: 'left'}}>NOMBRE Y APELLIDOS: {model.nombre}</td>
                        <td colSpan="7" style={{ textAlign: 'left'}}>NOMBRE Y APELLIDOS:</td>
                    </tr>
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'left', height: '1.2cm' }}>FIRMA:
                            { (model.firma_crea !== null && model.firma_crea !== undefined) ?
                                <Image
                                    src={ `${process.env.NEXT_PUBLIC_API_HOST}${model.firma_crea}`}
                                    alt={ 'firma' }
                                    width={ 70 }
                                    height={ 30 }
                                    className={'bg-sucess mx-auto d-block text-center'}
                                /> : ''
                        }
                        </td>
                        <td colSpan="7" style={{ textAlign: 'left', height: '1.2cm' }}>FIRMA:</td>
                    </tr>
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'left'}}>
                            CON CARGO AL PRESUPUESTO: {model.cargo_presupuesto}
                        </td>
                        <td colSpan="7" style={{ textAlign: 'left'}}>FECHA: {model.fecha}</td>
                    </tr>




                </tbody>



            </table>
        </div>
    );
};

export default TableDataAll;