'use client'
import React, {useEffect} from 'react';
import Image from "next/image";
import TableSolicitaAutoriza from "../TableSolicitaAutoriza";
import {modelo_detail_endpoint, modelo_endpoint, veryfy_token} from "../../../constants/apiRoutes";
import axios from "axios";
import TableDataAll from "../TableDataAll";
import {fetchConToken} from "../../../helper/fetch";
import {activeUser, inactiveUser} from "../../../redux/features/auth/authSlice";
import Loading from "../../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";


const Page = ({params}) => {
    const [model, setModel] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const {user, isActive, rol} = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const getData = async () => {
        const endpoint = modelo_detail_endpoint + params.id +'/'

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + endpoint
        )
            .then(response => {
                setModel(response.data);
                setShow(true)
            })
    }

    useEffect( () => {
        const userAuthenticated = window.localStorage.getItem('token');

        if (userAuthenticated === null) {
            return router.push('/login');

        }else{
            fetchConToken(veryfy_token, userAuthenticated, "GET").then((isValid) => {
                if( isValid.status === 401){
                    window.localStorage.clear()
                    dispatch(inactiveUser())
                    router.push('/login')


                }else{
                    dispatch(activeUser( {
                        user: user ,
                    } ) );
                }
            })
        }
    }, [dispatch,router])

    useEffect( () => {
        if(user !== null){
            getData();

            if( model.length !== 0 && show){
                window.print();
                setShow(false)
            }
        }
    }, [show])

    if (isActive === null ) {
        return (
            <Loading infoText='Verificando permisos' />
        )
    }

    return (

        <div className={'p-4'} style={{ width: 'max-content' }}>
            <div className={'d-flex justify-content-between align-items-center me-5'}>
                <Image
                    src={ '/../logo-model.png'}
                    alt={ 'Logotipo' }
                    width={ 180 }
                    height={ 70 }
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


