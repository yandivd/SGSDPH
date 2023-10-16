'use client'
import * as React from 'react';
import Loading from "../components/Loading";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {activeUser} from "../redux/features/auth/authSlice";

export default function Main() {
    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        const userAuthenticated = window.localStorage.getItem('token');
        const username = window.localStorage.getItem('username');


        if (userAuthenticated === null) {
            router.push('/login')

            dispatch(activeUser( {
                user: username ,
            } ) );

        }else {
            router.push('/dashboard/')
        }
    }, [dispatch,router])


    return (
        <Loading infoText={'Accediendo al sistema de gestión de solicitudes de dietas ...'} />
    );
}

