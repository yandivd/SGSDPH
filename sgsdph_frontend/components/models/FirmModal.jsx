import React from 'react';
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import {trabajadores_endpoint} from "../../constants/apiRoutes";
import Swal from "sweetalert2";

const FirmModal = ({handleFirmOpen,openFirm, register, handleSubmit }) => {
    const handleSubmitFirm = async(data) => {

        console.log('data', data)
        const id = window.localStorage.getItem('id');
        const method = "PATCH";
        const url = process.env.NEXT_PUBLIC_API_HOST + trabajadores_endpoint + id + '/';

        /*        const formData= {
                    "firma": data.firma[0]
                }*/

        const dataToSend = new FormData()
        dataToSend.append( 'firma', data.firma[0])

        try {
            const resp = await fetch( url, {
                method,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: dataToSend
            });

            if (resp.status === 200) {
                Swal.fire('Exito', "Operación finaliza con éxito", 'success');
            }else{
                Swal.fire('Error', "Error del servidor", 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <Dialog
                onClose={handleFirmOpen}
                aria-labelledby="customized-dialog-title"
                open={openFirm}
                className={'p-5'}
            >

                <IconButton
                    aria-label="close"
                    onClick={handleFirmOpen}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <form onSubmit={handleSubmit(handleSubmitFirm)}>
                    <DialogContent className='text-center'>
                        <h4 className='mt-4'>Introduzca su firma digital</h4>
                        <TextField
                            required
                            type={'file'}
                            helperText="Firma"
                            sx={{ mx: 2, mt: 3, width: '300px' }}
                            {...register("firma")}
                        />

                        <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                            <Button autoFocus onClick={handleFirmOpen} variant="contained" color='error'>
                                Cancelar
                            </Button> <br/>
                            <Button variant="contained" type="submit">
                                Aceptar
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>

        </div>
    );
};

export default FirmModal;