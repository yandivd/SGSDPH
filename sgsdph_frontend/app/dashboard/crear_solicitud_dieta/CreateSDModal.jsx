import React, {useEffect} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {DialogActions, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import FieldSelect from "../../../components/FieldSelect";
import {
    autoriza_endpoint,
    cargo_presupuesto_endpoint,
    ccosto_endpoint,
    solicita_endpoint, trabajadores_endpoint,
} from "../../../constants/apiRoutes";
import axios from "axios";
import {municipios} from "../../../constants/municipios";
import {useForm} from "react-hook-form";
import {fetchSinToken} from "../../../helper/fetch";
import {activeUser} from "../../../redux/features/auth/authSlice";



const CreateSdModal = ({isOpen, handleClose, setOpen}) => {
    const [solicita, setSolicita] = React.useState('');
    const [autoriza, setAutoriza] = React.useState('');
    const [ccosto, setCcosto] = React.useState('');
    const [cargoPresupuesto, setCargoPresupuesto] = React.useState('');
    const [trabajadores, setTrabajadores] = React.useState('');
    const [provinciaOrigen, setProvinciaOrigen] = React.useState(0);
    const [provinciaDestino, setProvinciaDestino] = React.useState(0);
    const [municipiosOrigen, setMunicipiosOrigen] = React.useState([]);
    const [municipiosDestino, setMunicipiosDestino] = React.useState([]);
    const { register, handleSubmit, errors } = useForm();

    useEffect( () => {
       getDataForm()

    }, [])

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

    const getDataForm = async () => {
        try {
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + solicita_endpoint
            )
                .then(response => {
                    setSolicita((response.data));
                })
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + autoriza_endpoint
            )
                .then(response => {
                    setAutoriza((response.data));
                })
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + ccosto_endpoint
            )
                .then(response => {
                    setCcosto((response.data));
                })
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + cargo_presupuesto_endpoint
            )
                .then(response => {
                    setCargoPresupuesto((response.data));
                })
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + trabajadores_endpoint
            )
                .then(response => {
                    setTrabajadores((response.data));
                })
        } catch (error) {
            console.log(error)
        }

    }

    const handleProvinciaOrigenChange = (event) => {
        const selectedProvincia = event.target.value;
        setProvinciaOrigen(selectedProvincia);
        setMunicipiosOrigen(municipios[selectedProvincia]);
    };

    const handleProvinciaDestinoChange = (event) => {
        const selectedProvincia = event.target.value;
        setProvinciaDestino(selectedProvincia);
        setMunicipiosDestino(municipios[selectedProvincia]);
    };


    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                className={'p-5'}
                maxWidth={'xl'}
                fullWidth={true}
                classes={{ paper: 'my-custom-dialog' }}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Agregar solicitud de dieta
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <div className={'d-flex gap-5'}>
                        <div>
                            <FieldSelect name_label={'Nombre'}
                                         data={solicita}
                                         id={'id_solicitante'}
                                         name={'solicitante'}
                                         value_show={'username'}
                            />
                            <FieldSelect name_label={'Trabajador'}
                                         id={'id_trabajador'}
                                         name={'trabajador'}
                                         data={trabajadores}
                                         value_show={'username'}
                            />
                            <FieldSelect name_label={'Centro Contable'}
                                         data={ccosto}
                                         id={'id_c_contable'}
                                         name={'c_contable'}
                                         value_show={'name'}
                            />
                        </div>

                        <div>
                            <TextField
                                select
                                label="Provincia Origen"
                                onChange={handleProvinciaOrigenChange}
                                sx={{ m: 2, width: '300px' }}
                            >

                                {municipios.map((provincia, index) => (
                                    <MenuItem key={index} value={index}>
                                        {provincia[1]}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Municipio Origen"
                                sx={{ m: 2, width: '300px' }}
                            >
                                {municipiosOrigen.map((municipio, index) => (
                                    <MenuItem key={index} value={municipio}>
                                        {municipio}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Provincia Destino"
                                onChange={handleProvinciaDestinoChange}
                                sx={{ m: 2, width: '300px' }}
                            >

                                {municipios.map((provincia, index) => (
                                    <MenuItem key={index} value={index}>
                                        {provincia[1]}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Municipio Destino"
                                sx={{ m: 2, width: '300px' }}
                            >
                                {municipiosDestino.map((municipio, index) => (
                                    <MenuItem key={index} value={municipio}>
                                        {municipio}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Regreso"
                                onChange={handleProvinciaOrigenChange}
                                sx={{ m: 2, width: '300px' }}
                            >

                                {municipios.map((provincia, index) => (
                                    <MenuItem key={index} value={index}>
                                        {provincia[1]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>



                        <div>
                            <FieldSelect name_label={'Persona autorizada a Recibir y Loquidar el efectivo del grupo:'}
                                         data={trabajadores}
                                         id={'id_parleg'}
                                         name={'id_parleg'}
                                         value_show={'username'}

                            />
                            <FieldSelect name_label={'Con Cargo al Presupuesto:'}
                                         data={cargoPresupuesto}
                                         id={'id_cargo_presupuesto'}
                                         name={'cargo_presupuesto'}
                                         value_show={'account'}

                            />

                            <FieldSelect name_label={'Autoriza'}
                                         data={autoriza}
                                         id={'id_autoriza'}
                                         name={'autoriza'}
                                         value_show={'username'}
                            />
                            <TextField
                                required
                                type={'date'}
                                id="outlined-required"
                                label="Fecha de Inicio"
                                sx={{ m: 2, width: '300px' }}
                            />
                            <TextField
                                required
                                type={'date'}
                                id="outlined-required"
                                label="Fecha Final"
                                sx={{ m: 2, width: '300px' }}
                            />


                        </div>


                    </div>


                    <div className={'mt-3'}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Labor a Realizar"
                            sx={{ m: 2, width: '92%' }}
                        />
                    </div>
                    <div className={'mt-3'}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Observaciones"
                            sx={{ m: 2, width: '92%' }}
                        />
                    </div>

                </DialogContent>

                <DialogActions sx={{m: 2}}>
                    <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
                    <Button onClick={handleClose} variant="contained" autoFocus color="success">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
};

export default CreateSdModal;
