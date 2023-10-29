import React from 'react';
import {trabajadores_endpoint} from "../../constants/apiRoutes";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";

const AddTrabajadorModal = ({handleAddTrabajadorOpen,openAddTrabajador, register, handleSubmit }) => {
    const handleSubmitFirm = async(data) => {

        console.log('data', data)
    }

    return (
        <div>
            <Dialog
                onClose={handleAddTrabajadorOpen}
                aria-labelledby="customized-dialog-title"
                open={openAddTrabajador}
                className={'p-5'}
            >

                <IconButton
                    aria-label="close"
                    onClick={handleAddTrabajadorOpen}
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
                        <h4 className='mt-4'>Formulario para agregar trabajadpror</h4>


                        <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                            <Button autoFocus onClick={handleAddTrabajadorOpen} variant="contained" color='error'>
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

export default AddTrabajadorModal;