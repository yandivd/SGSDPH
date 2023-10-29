import React, {useEffect, useState} from 'react';
import {
    aperitivos_endpoint, autoriza_endpoint, cargo_presupuesto_endpoint, ccosto_endpoint,
    personas_endpoint, rol_endpoint,
    solicita_endpoint, solicitudes_endpoint,
    trabajadores_endpoint, unidad_organizativa_endpoint
} from "../../constants/apiRoutes";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import FieldSelect from "../FieldSelect";
import axios from "axios";
import {useForm} from "react-hook-form";
import {fetchSinToken} from "../../helper/fetch";

const AddTrabajadorModal = ({handleAddTrabajadorOpen,openAddTrabajador }) => {
    const { register, control, handleSubmit, errors } = useForm();
    const [rol, setRol] = React.useState([]);
    const [unidadOrganizativa, setUnidadOrganizativa] = React.useState([]);
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmitWoker = async(data) => {
        setErrorMessage('')


        try {
            const resp = await fetchSinToken(trabajadores_endpoint, data, "POST");
            const body = await resp.json();

            if (resp.status === 400) {
                setErrorMessage('El trabajador ya existe')
            }

            if (resp.status === 201) {
                Swal.fire('Exito', "Se ha creado correctamente", 'success');
                handleAddTrabajadorOpen();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getDataForm = async () => {
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + unidad_organizativa_endpoint
            )
                .then(response => {
                    setUnidadOrganizativa((response.data));
                })
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + rol_endpoint
            )
                .then(response => {
                    setRol((response.data));
                })
        }

    useEffect( () => {
        getDataForm()

    }, [openAddTrabajador])

    return (
        <div>
            <Dialog
                onClose={handleAddTrabajadorOpen}
                aria-labelledby="customized-dialog-title"
                open={openAddTrabajador}
                className={'p-5'}
                maxWidth={'md'}
                fullWidth={true}
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

                <form onSubmit={handleSubmit(handleSubmitWoker)}>
                    <DialogContent className='text-center'>
                        <h4 className='mt-4'>Formulario para agregar trabajador</h4>

                        <div className={'d-flex align-items-center justify-content-between'}>

                            <TextField
                                label="Username"
                                type='text'
                                required
                                sx={{ m: 2, width: '200px' }}
                                {...register("username")}
                            />
                            <TextField
                                label="Nombre"
                                type='text'
                                required
                                sx={{ m: 2, width: '200px' }}
                                {...register("first_name")}
                            />
                            <TextField
                                label="Apellidos"
                                type='text'
                                required
                                sx={{ m: 2, width: '400px' }}
                                {...register("last_name")}
                            />

                        </div>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <TextField
                                label="Password"
                                required
                                type="password"
                                sx={{ m: 2, width: '200px' }}
                                {...register("password")}
                            />
                            <TextField
                                label="CI"
                                required
                                type="number"
                                sx={{ m: 2, width: '200px' }}
                                {...register('ci', {
                                    minLength: { value: 11, message: 'Mínimo 11 caracteres' },
                                    required: 'Campo requerido'
                                })}
                               /* error={true} // Verifica si errors y errors.ci están definidos
                                helperText={'njn'} // Accede a errors.ci si está definido*/
                            />

                            <TextField
                                label="Email"
                                required
                                type="email"
                                sx={{ m: 2, width: '400px' }}
                                {...register("email")}
                            />

                        </div>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <FieldSelect name_label={'Rol'}
                                         data={rol}
                                         name={'rol'}
                                         value_show1={'name'}
                                         control={control}
                                         isRequired={true}
                                         width={'188px'}
                            />

                            <TextField
                                label="Cargo"
                                required
                                type='text'
                                sx={{ m: 2, width: '200px' }}
                                {...register("cargo")}
                            />
                             <TextField
                                label="Dependencia"
                                required
                                type='text'
                                sx={{ m: 2, width: '400px' }}
                                {...register("dependencia")}
                            />

                        </div>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <TextField
                                label="Telefono"
                                required
                                type='number'
                                sx={{ m: 2, width: '188px' }}
                                {...register("telf")}
                            />

                            <FieldSelect name_label={'Unidad Organizativa'}
                                         data={unidadOrganizativa}
                                         name={'unidad_organizativa'}
                                         value_show1={'name'}
                                         control={control}
                                         isRequired={true}
                                         width={'365px'}

                            />



                        </div>

                        {errorMessage && <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}


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