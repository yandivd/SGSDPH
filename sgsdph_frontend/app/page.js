'use client'
import * as React from 'react';
import Loading from "../components/Loading";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

export default function Main() {
    const router = useRouter();
    const {isActive} = useSelector((state) => state.auth);

    useEffect(() => {

        if (!isActive) {
            router.push('/login')
        } else {
            router.push('/dashboard/')
        }
    }, [router])


    return (
        <Loading infoText={'Accediendo al sistema de gestión de solicitudes de dietas...'} />
    );
}

