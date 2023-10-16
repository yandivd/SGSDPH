import React from 'react'
import { CircularProgress } from '@mui/material'
import Typography from "@mui/material/Typography";

const Loading = ({ infoText }) => {
    return (
        <div className='container mt-5'>
            <div className='d-flex gap-4 flex-column mt-5 mx-auto align-content-center align-items-center justify-content-center'>
                <Typography>{infoText}</Typography>
                <h1>Etecsa</h1>
                <CircularProgress />
            </div>
        </div>
    )
}

export default Loading
