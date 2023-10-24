'use client'
import React, {useEffect} from 'react';
import Image from "next/image";
import TableSolicitaAutoriza from "../TableSolicitaAutoriza";
import {modelo_detail_endpoint, modelo_endpoint} from "../../../constants/apiRoutes";
import axios from "axios";
import TableDataAll from "../TableDataAll";


const Page = ({params}) => {
    const [model, setModel] = React.useState([]);


    const getData = async () => {
        const endpoint = modelo_detail_endpoint + params.id +'/'

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + endpoint
        )
            .then(response => {
                setModel(response.data);
            })
    }

    useEffect( () => {
        getData();
        window.print();

    }, [])

    console.log('mdel',model)

    return (

        <div className={'pt-2 pb-5 px-4 '}>
            <div className={'d-flex justify-content-between align-items-center me-5'}>
                <Image
                    src={ '/../logo.jpg'}
                    alt={ 'Logotipo' }
                    width={ 200 }
                    height={ 100 }
                    className={'bg-sucess'}
                />
                <h6 style={{ display: 'flex', justifyContent: 'center' }}>SOLICITUD DE DIETAS</h6>
                <div>
                    <div>Fecha: {model.fecha}</div>
                    <div>Telefono solicit.: {model.telf_solicitante}</div>
                </div>
            </div>

            <div className={'mt-3 d-flex justify-content-between'}>
                <TableSolicitaAutoriza data={model}
                                       tittle={'Autoriza (3)'}
                                       name={model.autoriza}
                                       cargo={model.cargo_autoriza}
                                       dependencia={model.dependencia_autoriza}
                />


                <TableSolicitaAutoriza data={model}
                                       tittle={'Solicita (4)'}
                                       name={model.solicitante}
                                       cargo={model.cargo_solicita}
                                       dependencia={model.dependencia_solicita}
                />

            </div>

            <div className={'d-flex justify-content-between align-items-center my-4 w-50'}>
                <h6>TIPO DE SOLICITUD (5):</h6>
                <div>
                    <span>Ordinaria:___</span>
                    <span>Prórroga:____</span>
                </div>
            </div>

            <TableDataAll model={model} />

        </div>

    );
};

export default Page;


