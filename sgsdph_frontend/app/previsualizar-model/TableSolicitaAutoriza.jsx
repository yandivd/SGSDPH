import React from 'react';
import './stylesTablesModel.css'
import Image from "next/image";
import {trabajadores_endpoint} from "../../constants/apiRoutes";


const TableSolicitaAutoriza = ({ tittle, name, cargo, dependencia , data, firma}) => {
    console.log(firma)

    var imageUrl = ''

    if( firma !== null && firma !== undefined){
        imageUrl = `${process.env.NEXT_PUBLIC_API_HOST}${firma}`
    }
    console.log(imageUrl)
    return (
        <table style={{ borderCollapse: 'collapse', width: '450px', padding: "20px"}} >
            <tbody>
                <tr>
                    <td className={'tablePrevizualizar'}>{tittle}</td>
                </tr>
                <tr>
                    <td className={'tablePrevizualizar'} style={{ height: '0.21in' }}>Firma</td>
                    <td className={'tablePrevizualizar'} style={{ height: '0.21in' }} >
                        { firma !== null ?
                        <Image
                            src={ imageUrl}
                            alt={ 'firma' }
                            width={ 70 }
                            height={ 30 }
                            className={'bg-sucess mx-auto d-block text-center'}
                        /> : ''
                        }
                    </td>
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
