import React from 'react';
import styles from './TableAnticipo.module.css'
import Image from "next/image";

const TableAnticipo = ({anticipo}) => {
    const fecha_1 = new Date(anticipo.fecha);
    const dia_1 = fecha_1.getDate();
    const mes_1 = fecha_1.getMonth() + 1;
    const ano_1 = fecha_1.getFullYear();

    const fecha_2 = new Date(anticipo.modelo.solicitudes[0].fecha_inicio_dieta);
    const dia_2 = fecha_2.getDate();
    const mes_2 = fecha_2.getMonth() + 1;
    const ano_2 = fecha_2.getFullYear();

    const fecha_3 = new Date(anticipo.modelo.solicitudes[0].fecha_final_dieta);
    const dia_3 = fecha_3.getDate();
    const mes_3 = fecha_3.getMonth() + 1;
    const ano_3 = fecha_3.getFullYear();


    console.log(anticipo)

    return (
        <div>
            <table className={styles.tableAnticipo}>
                <thead>
                <tr>
                    <th style={{ width: '4.18in', height: '1.05in' }} rowSpan={3} >
                        <div className={'d-flex flex-column align-items-start justify-content-start'}>
                            <div>Centro contable: {anticipo.modelo.c_contable} </div>
                            <div>Areas de Trabajo: {anticipo.modelo.unidad_organizativa}  </div>
                            <div> Solicitud No.: {anticipo.modelo.consec}  </div>
                        </div>
                    </th>
                    <th style={{ width: '5.61in', height: '1.05in' }} rowSpan={3} className={'text-center'}>
                        <b> SC-3-02<br/>
                        ANTICIPO Y LIQUIDACIÓN DE<br/>
                        GASTOS DE VIAJES NACIONALES<br/>
                        EN CUP<br/>
                        </b>
                    </th>
                    <th style={{ width: '3.42in', height: '0.63in' }} rowSpan={1} colSpan={3}>
                        <Image
                            src={ '/../logo-model.png'}
                            alt={ 'Logotipo' }
                            width={ 320 }
                            height={ 65 }
                            className={'bg-sucess'}
                        />
                    </th>
                </tr>
                <tr>
                    <th className={'text-center'} style={{ width: '1.23in', height: '0.21in' }}>D</th>
                    <th className={'text-center'} style={{ width: '1.10in', height: '0.21in' }}>M</th>
                    <th className={'text-center'} style={{ width: '1.09in', height: '0.21in' }}>A</th>
                </tr>
                <tr>
                    <th className={'text-center'} style={{ width: '1.23in', height: '0.21in' }}>{dia_1}</th>
                    <th className={'text-center'} style={{ width: '1.10in', height: '0.21in' }}>{mes_1}</th>
                    <th className={'text-center'} style={{ width: '1.09in', height: '0.21in' }}>{ano_1}</th>
                </tr>
                </thead>
            </table>
            <table className={styles.tableAnticipo}>
                <thead>
                  <tr>
                        <td style={{ width: '7.5in', height: '0.42in' }} rowSpan={2} >Nombre Completo y Apellido: {anticipo.modelo.parleg} </td>
                        <td className={'text-center'} style={{ width: '5.71in', height: '0.21in' }}  rowSpan={1} colSpan={2}>CLASIFICACiÓN</td>
                    </tr>
                    <tr>
                        <td style={{ width: '4.62in', height: '0.21in' }}>Fuera de la Localidad (Extranjero)</td>
                        <td style={{ width: '1.09in', height: '0.21in' }}></td>
                    </tr>
                </thead>
            </table>
            <table className={styles.tableAnticipo}>
                <thead>
                    <tr>
                        <td style={{ width: '7.5in', height: '1.47in' }} rowSpan={7}>Labor a realizar o detalle del pago: {anticipo.modelo.labor} </td>
                        <td colSpan={4} style={{ width: '4.62in', height: '0.21in' }}>En la localidad (Dentro del país)</td>
                        <td style={{ width: '1.09in', height: '0.21in' }} className={'text-center'}>X</td>
                    </tr>

                    <tr>
                        <td style={{ width: '2.29in', height: '0.21in' }} colSpan={2} className={'text-center'}>Fecha</td>
                        <td style={{ width: '1.23in', height: '0.21in' }} className={'text-center'}>D</td>
                        <td style={{ width: '1.0in', height: '0.21in' }} className={'text-center'}>M</td>
                        <td style={{ width: '1.09in', height: '0.21in' }} className={'text-center'}>H</td>
                    </tr>
                    <tr>
                        <td style={{ width: '2.29in', height: '0.21in' }} colSpan={2}>Salida Estimada</td>
                        <td className={'text-center'}>{dia_2}</td>
                        <td className={'text-center'}>{mes_2}</td>
                        <td className={'text-center'}>{ano_2}</td>
                    </tr>
                    <tr>
                        <td style={{ width: '2.29in', height: '0.21in' }} colSpan={2}>Regreso Estimado</td>
                        <td className={'text-center'}>{dia_3}</td>
                        <td className={'text-center'}>{mes_3}</td>
                        <td className={'text-center'}>{ano_3}</td>
                    </tr>
                    <tr>
                        <td style={{ width: '2.29in', height: '0.21in' }} colSpan={2}>Salida Real</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ width: '1.09in', height: '0.21in' }} colSpan={2}>Regreso Real</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ height: '0.33in' }} colSpan={5} className={'text-center'}>Días de Viaje</td>
                    </tr>
                </thead>
            </table>
            <table className={styles.tableAnticipo}>
                <thead>
                <tr>
                    <td style={{ width: '5.96in', height: '0.21in' }}></td>
                    <td style={{ width: '0.78in', height: '0.21in' }}>DIA</td>
                    <td style={{ width: '0.76in', height: '0.21in' }}>MES</td>
                    <td style={{ width: '4.62in', height: '0.21in' }}>Días Estimados</td>
                    <td style={{ width: '1.09in', height: '0.21in' }} className={'text-center'}>{anticipo.dias_estimados}</td>
                </tr>
                </thead>
            </table>
            <table className={styles.tableAnticipo}>
                <thead>
                    <tr>
                        <td style={{ width: '3.25in', height: '0.21in' }} rowSpan={2}>Entrega</td>
                        <td style={{ width: '2.71in', height: '0.21in' }} rowSpan={2}>Liquidación</td>
                        <td style={{ width: '0.78in', height: '0.21in' }} rowSpan={2}></td>
                        <td style={{ width: '0.76in', height: '0.21in' }} rowSpan={2}></td>
                        <td style={{ width: '4.62in', height: '0.21in' }}>Días Reales</td>
                        <td style={{ width: '1.09in', height: '0.21in' }} className={'text-center'}></td>
                    </tr>
                    <tr>
                        <td>
                            Días Hospedados Reales
                        </td>
                        <td></td>
                    </tr>
                </thead>
            </table>
            <table className={styles.ultimoTable}>
                <thead>
                    <tr>
                        <td style={{ width: '2.01in', height: '0.42in' }} rowSpan={2} colSpan={2}>Recibido</td>
                        <td style={{ width: '1.24in', height: '0.21in' }}>DIA</td>
                        <td style={{ width: '0.93in', height: '0.21in' }}>MES</td>
                        <td style={{ width: '1.78in', height: '0.21in' }} colSpan={2} className={'text-center'}>Concepto</td>
                        <td style={{ width: '1.54in', height: '0.21in' }} className={'text-center'}>Total</td>
                        <td style={{ width: '1.10in', height: '0.21in' }}>Alimentación</td>
                        <td style={{ width: '1.19in', height: '0.21in' }}>Hosp.</td>
                        <td style={{ width: '1.23in', height: '0.21in' }}>Desayuno</td>
                        <td style={{ width: '1.10in', height: '0.21in' }}>Otros</td>
                        <td style={{ width: '1.09in', height: '0.21in' }}>Transp.</td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td colSpan={2} className={'text-center'}>Entregado</td>
                        <td className={'text-center'}>{anticipo.total}</td>
                        <td className={'text-center'}>{anticipo.alimentacion_costo}</td>
                        <td> </td>
                        <td className={'text-center'}>{anticipo.desayuno_costo} </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td rowSpan={2} colSpan={2}>Liquidado</td>
                        <td>DIA</td>
                        <td>MES</td>
                        <td colSpan={2} className={'text-center'}>Utilizado</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td colSpan={2} className={'text-center'}>Devuelto</td>
                        <td></td>
                        <td></td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td rowSpan={3} colSpan={2}>Custodio</td>
                        <td rowSpan={2}>DIA</td>
                        <td rowSpan={2}>MES</td>
                        <td colSpan={2} className={'text-center'}>A Pagar</td>
                        <td colSpan={1}></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={7}>Anotado por: {anticipo.modelo.nombre}</td>
                        <td rowSpan={2}>No {anticipo.consec}</td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td colSpan={7}>Registrado por: </td>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default TableAnticipo;