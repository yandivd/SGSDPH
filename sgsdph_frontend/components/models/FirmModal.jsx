import { useState } from 'react';
import { TextField, Button, Dialog, DialogContent } from '@mui/material';
import Swal from 'sweetalert2';
import {trabajadores_endpoint} from "../../constants/apiRoutes";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {DialogActions} from "@mui/material";
import {useForm} from "react-hook-form";

function MyComponent({openFirm, handleFirmOpen}) {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmitFirm = async () => {
        if (selectedFile) {
            const id = window.localStorage.getItem('id');
            const url = `${process.env.NEXT_PUBLIC_API_HOST}${trabajadores_endpoint}${id}/`;

            const dataToSend = new FormData();
            dataToSend.append('firma', selectedFile);

            try {
                const resp = await fetch(url, {
                    method: 'PATCH',
                    body: dataToSend,
                });

                if (resp.status === 200) {
                    Swal.fire('Éxito', 'Operación finalizada con éxito', 'success');
                } else {
                    Swal.fire('Error', 'Error del servidor', 'error');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Error del servidor', 'error');
            }

            handleFirmOpen(!openFirm);
        }
    };

    return (
        <div>

            <Dialog
                onClose={handleFirmOpen}
                aria-labelledby="customized-dialog-title"
                open={openFirm}
                className={'p-5'}
                onChange={handleFileChange}
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
                            <Button variant="contained" type="submit" onClick={handleSubmitFirm}>
                                Aceptar
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default MyComponent;
