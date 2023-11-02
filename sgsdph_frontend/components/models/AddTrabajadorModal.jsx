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
    const { register, control, handleSubmit, formState: { errors } } = useForm();
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
        if(openAddTrabajador){
            getDataForm();
        }

    }, [openAddTrabajador, openAddTrabajador])

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
                                sx={{ m: 2, width: '200px' }}
                                {...register("username", {
                                    required: 'Campo requerido'
                                })}
                                error={errors.username}
                                helperText={errors.username && errors.username.message}
                            />
                            <TextField
                                label="Nombre"
                                type='text'
                                sx={{ m: 2, width: '200px' }}
                                {...register("first_name", {
                                    required: 'Campo requerido'
                                })}
                                error={errors.first_name}
                                helperText={errors.first_name && errors.first_name.message}
                            />
                            <TextField
                                label="Apellidos"
                                type='text'
                                sx={{ m: 2, width: '400px' }}
                                {...register("last_name", {
                                    required: 'Campo requerido'
                                })}
                                error={errors.last_name}
                                helperText={errors.last_name && errors.last_name.message}
                            />

                        </div>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <TextField
                                label="Password"
                                type="password"
                                sx={{ m: 2, width: '200px' }}
                                {...register('password',
                                    {required: 'Campo requerido'})}

                                error={errors.password}
                                helperText={errors.password && errors.password.message}
                            />
                            <TextField
                                label="CI"
                                type="number"
                                sx={{ m: 2, width: '200px' }}
                                {...register('ci', {
                                        pattern: {
                                            value: /^[0-9]{11}$/,
                                            message: 'Debe contener 11 dígitos numéricos',
                                        },
                                    required: 'Campo requerido'
                                })}
                                error={errors.ci}
                                helperText={errors.ci && errors.ci.message}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                sx={{ m: 2, width: '400px' }}
                                {...register('email',
                                    {required: 'Campo requerido'})}

                                error={errors.email}
                                helperText={errors.email && errors.email.message}
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
                                type='text'
                                sx={{ m: 2, width: '200px' }}
                                {...register('cargo', {
                                    required: 'Campo requerido'
                                })}
                                error={errors.cargo}
                                helperText={errors.cargo && errors.cargo.message}
                            />
                             <TextField
                                label="Dependencia"
                                type='text'
                                sx={{ m: 2, width: '400px' }}
                                {...register('dependencia', {
                                    required: 'Campo requerido'
                                })}
                                error={errors.dependencia}
                                helperText={errors.dependencia && errors.dependencia.message}
                            />

                        </div>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <TextField
                                label="Telefono"
                                type='text'
                                sx={{ m: 2, width: '188px' }}
                                {...register('telf', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^\d+$/, // Expresión regular para aceptar solo números
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                error={errors.telf}
                                helperText={errors.telf && errors.telf.message}
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