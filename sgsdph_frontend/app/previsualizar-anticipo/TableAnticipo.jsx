import React from 'react';
import styles from './TableAnticipo.module.css'
import Image from "next/image";

const TableAnticipo = () => {
    return (
        <div>
            <table className={styles.tableAnticipo}>
                <thead>
                <tr>
                    <th style={{ width: '4.18in', height: '1.05in' }} rowSpan={3} >
                        <div className={'d-flex flex-column align-items-start justify-content-start'}>
                            <span>Centro contable: PONER </span>
                            <sapn>Areas de Trabajo: PONER </sapn>
                            <span> Solicitud No.: PONER </span>
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
                    <th className={'text-center'} style={{ width: '1.23in', height: '0.21in' }}>PONER</th>
                    <th className={'text-center'} style={{ width: '1.10in', height: '0.21in' }}>PONER</th>
                    <th className={'text-center'} style={{ width: '1.09in', height: '0.21in' }}>PONER</th>
                </tr>
                </thead>
            </table>
            <table className={styles.tableAnticipo}>
                <thead>
                  <tr>
                        <td style={{ width: '7.5in', height: '0.42in' }} rowSpan={2} >Nombre Completo y Apellido: Parleg PONER</td>
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
                        <td style={{ width: '7.5in', height: '1.47in' }} rowSpan={7}>Laabor a realizar o detalle del pago: Larbbor PONEr</td>
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
                        <td style={{ width: '2.29in', height: '0.21in' }} colSpan={2}>Regreso Estimado</td>
                        <td className={'text-center'}>PONER</td>
                        <td className={'text-center'}>PONER</td>
                        <td className={'text-center'}>PONER</td>
                    </tr>
                    <tr>
                        <td style={{ width: '2.29in', height: '0.21in' }} colSpan={2}>Regreso Estimado</td>
                        <td className={'text-center'}>PONER</td>
                        <td className={'text-center'}>PONER</td>
                        <td className={'text-center'}>PONER</td>
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
                    <td style={{ width: '1.09in', height: '0.21in' }} className={'text-center'}>1</td>
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
                        <td className={'text-center'}>2500.00</td>
                        <td className={'text-center'}>2500.00</td>
                        <td> </td>
                        <td> </td>
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
                        <td colSpan={7}>Anotado por: Katia González Figueroa</td>
                        <td rowSpan={2}>No PONER</td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td colSpan={7}>Registrado por: Yomara Barrios Barrios</td>
                    </tr>
                </thead>
            </table>
            <br/>
        </div>
    );
};

export default TableAnticipo;