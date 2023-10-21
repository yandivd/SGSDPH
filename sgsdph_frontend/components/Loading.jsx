import React from 'react'
import { CircularProgress } from '@mui/material'
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Loading = ({ infoText }) => {
    return (
        <div className='container mt-5'>
            <div className='d-flex gap-4 flex-column mt-5 mx-auto align-content-center align-items-center justify-content-center'>
                <Image
                    src={ '/../logo.jpg'}
                    alt={ 'Logotipo' }
                    width={ 300 }
                    height={ 150 }
                    className={'bg-sucess'}
                />
                <h4>{infoText}...</h4>

                <CircularProgress />
            </div>
        </div>
    )
}

export default Loading
