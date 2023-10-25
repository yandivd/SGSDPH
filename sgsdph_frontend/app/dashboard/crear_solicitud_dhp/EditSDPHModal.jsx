import React, {useEffect} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import FieldSelect from "../../../components/FieldSelect";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {municipios} from "../../../constants/municipios";
import {DialogActions, FormLabel, MenuItem} from "@mui/material";
import CheckBoxPersonalizate from "../../../components/CheckBoxPersonalizate";
import Button from "@mui/material/Button";
import axios from "axios";
import {
    aperitivos_endpoint,
    autoriza_endpoint, cargo_presupuesto_endpoint, ccosto_endpoint,
    solicita_endpoint, solicitudes_endpoint,
    trabajadores_endpoint
} from "../../../constants/apiRoutes";
import {fetchSinToken} from "../../../helper/fetch";
import Swal from "sweetalert2";

const EditSDPHModal = ({isOpen, handleClose, solicitudes, refreshFunction, length}) => {
    const [solicita, setSolicita] = React.useState([]);
    const [autoriza, setAutoriza] = React.useState([]);
    const [ccosto, setCcosto] = React.useState([]);
    const [cargoPresupuesto, setCargoPresupuesto] = React.useState([]);
    const [trabajadores, setTrabajadores] = React.useState([]);
    const [aperitivo, setAperitivo] = React.useState([]);
    const [provinciaOrigen, setProvinciaOrigen] = React.useState(0);
    const [provinciaDestino, setProvinciaDestino] = React.useState(0);
    const [municipiosOrigen, setMunicipiosOrigen] = React.useState([]);
    const [municipiosDestino, setMunicipiosDestino] = React.useState([]);
    const { register, control, handleSubmit, errors } = useForm();

    useEffect( () => {
        getDataForm()

    }, [solicitudes, length])

    const getDataForm = async () => {
        if(solicitudes.length > 0 && length !== null){

            const first_solicitud =  solicitudes[0]
            setSolicita([{
                'username': first_solicitud.solicitante.username,
                'id': first_solicitud.solicitante.id
            }])
            setCcosto([{
                'name': first_solicitud.c_contable.name,
                'id': first_solicitud.c_contable.id
            }])
            setCargoPresupuesto([{
                'account': first_solicitud.cargo_presupuesto.account,
                'id': first_solicitud.cargo_presupuesto.id
            }])
            setAutoriza([{
                'username': first_solicitud.autoriza.username,
                'id': first_solicitud.autoriza.id
            }])
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + aperitivos_endpoint
            )
                .then(response => {
                    setAperitivo((response.data));
                })
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + trabajadores_endpoint
            )
                .then(response => {
                    setTrabajadores((response.data));
                })
        }else{

            if(length !== null){
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

                    await axios.get(
                        process.env.NEXT_PUBLIC_API_HOST + aperitivos_endpoint
                    )
                        .then(response => {
                            setAperitivo((response.data));
                        })

                } catch (error) {
                    console.log(error)
                }
            }
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

    const onSubmit = async (data) => {
        const unidad_organizativa = window.localStorage.getItem('unidad_organizativa');

        var aperitivo = [];

        for (var propiedad in data) {
            if (data.hasOwnProperty(propiedad)) {
                if(propiedad === "provincia" || propiedad === "prov_destino"){
                    if( data[propiedad] === 1 ){
                        data[propiedad] = 'Pinar del Río';
                    }
                    if( data[propiedad] === 2 ){
                        data[propiedad] = 'Artemisa';
                    }
                    if( data[propiedad] === 3 ){
                        data[propiedad] = 'La Habana';
                    }
                    if( data[propiedad] === 4 ){
                        data[propiedad] = 'Mayabeque';
                    }
                    if( data[propiedad] === 5 ){
                        data[propiedad] = 'Matanzas';
                    }
                    if( data[propiedad] === 6 ){
                        data[propiedad] = 'Villa Clara';
                    }
                    if( data[propiedad] === 7 ){
                        data[propiedad] = 'Cienfuegos';
                    }
                    if( data[propiedad] === 8 ){
                        data[propiedad] = 'Sancti Spíritus';
                    }
                    if( data[propiedad] === 9 ){
                        data[propiedad] = 'Ciego de Ávila';
                    }
                    if( data[propiedad] === 10 ){
                        data[propiedad] = 'Camagüey';
                    }
                    if( data[propiedad] === 11 ){
                        data[propiedad] = 'Las Tunas';
                    }
                    if( data[propiedad] === 12 ){
                        data[propiedad] = 'Holguín';
                    }
                    if( data[propiedad] === 13 ){
                        data[propiedad] = 'Granma';
                    }
                    if( data[propiedad] === 14 ){
                        data[propiedad] = 'Santiago de Cuba';
                    }
                    if( data[propiedad] === 15 ){
                        data[propiedad] = 'SGuantánamo';
                    }
                    if( data[propiedad] === 16 ){
                        data[propiedad] = 'Isla de la Juventud';
                    }

                }
            }

            if(propiedad.includes("checkbox")){
                if (data[propiedad] !== ''){
                    aperitivo.push(data[propiedad])
                }

                delete data[propiedad];
            }
        }

        data.tipo_sol = 2; // Agregar el campo "tipo de solicitud"
        data.estado = 'StandBye';      // Agregar el campo "estado"
        data.aperitivo = aperitivo;      // Agregar el campo "aperitivo"
        data.numero = solicitudes.numero;      // Agregar el campo "numero de solicitud"
        data.unidad_organizativa = unidad_organizativa;      // Agregar el campo "numero de solicitud"

        const endpoint = solicitudes_endpoint + solicitudes.id +'/'

        try {
            const resp = await fetchSinToken(endpoint, data, "PUT");
            const body = await resp.json();

            if (resp.status === 200) {
                Swal.fire('Exito', "Se ha editado correctamente", 'success');
                refreshFunction();
            }else{
                Swal.fire('Error', "Error del servidor", 'error');
            }

        } catch (error) {
            console.log(error)
        }

        handleClose();
    }
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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <div className={'d-flex gap-5'}>
                            <div>
                                <FieldSelect name_label={'Solicita'}
                                             data={solicita}
                                             name={'solicitante'}
                                             value_show={'username'}
                                             control={control}
                                />
                                <FieldSelect name_label={'Trabajador'}
                                             name={'trabajador'}
                                             data={trabajadores}
                                             value_show={'nombre'}
                                             control={control}
                                />
                                <FieldSelect name_label={'Centro Contable'}
                                             data={ccosto}
                                             name={'c_contable'}
                                             value_show={'name'}
                                             control={control}
                                />
                                <FieldSelect name_label={'Persona autorizada a Recibir y Loquidar el efectivo del grupo:'}
                                             data={trabajadores}
                                             name={'parleg'}
                                             value_show={'nombre'}
                                             control={control}
                                />
                                <FieldSelect name_label={'Con Cargo al Presupuesto:'}
                                             data={cargoPresupuesto}
                                             name={'cargo_presupuesto'}
                                             value_show={'account'}
                                             control={control}
                                />

                                <FieldSelect name_label={'Autoriza'}
                                             data={autoriza}
                                             name={'autoriza'}
                                             value_show={'username'}
                                             control={control}
                                />
                            </div>

                            <div>
                                <Controller
                                    name='provincia'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            label="Provincia Origen"
                                            required
                                            name='provincia'
                                            {...field}
                                            sx={{ m: 2, width: '300px' }}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                handleProvinciaOrigenChange(event);
                                            }}
                                        >
                                            {municipios.map((provincia, index) => (
                                                <MenuItem key={index} value={index}>
                                                    {provincia[0]}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name='origen'
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            required
                                            label="Municipio Origen"
                                            name='origen'
                                            {...field}
                                            sx={{ m: 2, width: '300px' }}
                                        >
                                            {municipiosOrigen.length > 0 ?
                                                municipiosOrigen.slice(1).map((municipio, index) => (
                                                    <MenuItem key={index} value={municipio}>
                                                        {municipio}
                                                    </MenuItem>
                                                ))
                                                : municipiosOrigen.map((municipio, index) => (
                                                    <MenuItem key={index} value={municipio}>
                                                        {municipio}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    )}
                                />
                                <Controller
                                    name='prov_destino'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            label="Provincia Destino"
                                            required
                                            name='prov_destino'
                                            {...field}
                                            sx={{ m: 2, width: '300px' }}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                handleProvinciaDestinoChange(event);
                                            }}
                                        >
                                            {municipios.map((provincia, index) => (
                                                <MenuItem key={index} value={index}>
                                                    {provincia[0]}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name='destino'
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            required
                                            label="Municipio Destino"
                                            name='destino'
                                            {...field}
                                            sx={{ m: 2, width: '300px' }}
                                        >
                                            {municipiosDestino.slice(1).map((municipio, index) => (
                                                <MenuItem key={index} value={municipio}>
                                                    {municipio}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />


                                <Controller
                                    name='regreso'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            label="Regreso"
                                            required
                                            name='regreso'
                                            {...field}
                                            sx={{ m: 2, width: '300px' }}
                                        >
                                            {municipios.map((provincia, index) => (
                                                <MenuItem key={index} value={provincia[0]}>
                                                    {provincia[0]}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                                <FormLabel sx={{ mx: 2}} component="legend">Gasto en comida</FormLabel>
                                <CheckBoxPersonalizate data={aperitivo} control={control} />
                            </div>

                            <div>
                                <TextField
                                    required
                                    type={'date'}
                                    label="Fecha de Inicio"
                                    sx={{ m: 2, width: '300px' }}
                                    helperText="Fecha Inicio Dieta"
                                    defaultValue= {solicitudes.fecha_inicio_dieta}
                                    {...register("fecha_inicio_dieta")}
                                />
                                <TextField
                                    required
                                    type={'date'}
                                    label="Fecha Final"
                                    helperText="Fecha Final Dieta"
                                    sx={{ mx: 2, my: 1, width: '300px' }}
                                    defaultValue= {solicitudes.fecha_final_dieta}
                                    {...register("fecha_final_dieta")}
                                />

                                <TextField
                                    required
                                    type={'date'}
                                    label="Fecha de Inicio"
                                    helperText="Fecha Inicio Pasaje"
                                    sx={{ mx: 2, my: 1, width: '300px' }}
                                    defaultValue= {solicitudes.fecha_inicio_pasaj}
                                    {...register("fecha_inicio_pasaj")}
                                />
                                <TextField
                                    required
                                    type={'date'}
                                    label="Fecha Final"
                                    helperText="Fecha Final Pasaje"
                                    sx={{ mx: 2, my: 1, width: '300px' }}
                                    defaultValue= {solicitudes.fecha_final_pasaj}
                                    {...register("fecha_final_pasaj")}
                                />
                                <TextField
                                    required
                                    type={'date'}
                                    label="Fecha de Inicio"
                                    helperText="Fecha Inicio Hospedaje"
                                    sx={{ mx: 2, my: 1, width: '300px' }}
                                    defaultValue= {solicitudes.fecha_inicio_hosp}
                                    {...register("fecha_inicio_hosp")}
                                />
                                <TextField
                                    required
                                    type={'date'}
                                    label="Fecha Final"
                                    helperText="Fecha Final Hospedaje"
                                    sx={{ mx: 2, my: 1, width: '300px' }}
                                    defaultValue= {solicitudes.fecha_final_hosp}
                                    {...register("fecha_final_hosp")}
                                />

                            </div>

                        </div>


                        <div className={'mt-3'}>
                            <TextField
                                id="outlined-required"
                                label="Labor a Realizar"
                                defaultValue=""
                                sx={{ m: 2, width: '92%' }}
                                {...register("labor")}
                            />
                        </div>
                        <div className={'mt-3'}>
                            <TextField
                                id="outlined-required"
                                label="Observaciones"
                                sx={{ m: 2, width: '92%' }}
                                {...register("observaciones")}
                            />
                        </div>

                    </DialogContent>

                    <DialogActions sx={{m: 2}}>
                        <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
                        <Button type="submit" variant="contained" autoFocus color="success">
                            Aceptar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>


        </div>
    );
};

export default EditSDPHModal;