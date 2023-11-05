'use client'
import React, {useEffect} from 'react';
import TableAnticipo from "../TableAnticipo";
import TableTrabajadores from "../TableTrabajadores";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {anticipo_endpoint, veryfy_token} from "../../../constants/apiRoutes";
import axios from "axios";
import {fetchConToken} from "../../../helper/fetch";
import {activeUser, inactiveUser} from "../../../redux/features/auth/authSlice";
import Loading from "../../../components/Loading";

const Page = ({params}) => {
    const [anticipo, setAnticipo] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const {user, isActive, rol} = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const getData = async () => {
        const endpoint = anticipo_endpoint + params.id +'/'

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + endpoint
        )
            .then(response => {
                setAnticipo(response.data);
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
        const userAuthenticated = window.localStorage.getItem('token');

        if (userAuthenticated !== null) {
            getData();

            if( anticipo.length !== 0 && show){
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
        <div className={'p-3'} style={{ width: 'max-content', margin: 'auto' }}>

            { anticipo.length !== 0 &&
                <div>

                    <TableAnticipo anticipo={anticipo} />


                    <TableTrabajadores anticipo={anticipo} />
                </div>
            }

        </div>
    );
};

export default Page;