import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import FieldSelect from "../../../components/FieldSelect";
import TextField from "@mui/material/TextField";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";

const CreateSdhpModal = ({isOpen, handleClose, setOpen}) => {
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

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                className={'p-5'}
                maxWidth={'xl'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Agregar solicitud de dieta, hospedaje y pasaje
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

                <DialogContent dividers fullWidth={true}>
                    <div className={'d-flex gap-5'}>
                        <div>
                            <FieldSelect name_label={'Solicita'} data={currencies} id={'id_solicitante'} name={'solicitante'}/>
                            <FieldSelect name_label={'Trabajador'} data={currencies} id={'id_trabajador'} name={'trabajador'}/>
                            <FieldSelect name_label={'Centro Contable'} data={currencies} id={'id_c_contable'} name={'c_contable'}/>
                        </div>

                        <div>
                            <FieldSelect name_label={'Provincia Origen'} data={currencies} id={'id_provincia_o'} name={'provincia_o'}/>
                            <FieldSelect name_label={'Municipio Origen'} data={currencies} id={'id_municipio_o'} name={'municipio_o'}/>
                            <FieldSelect name_label={'Provincia Destino'} data={currencies} id={'id_provincia_d'} name={'provincia_d'}/>
                            <FieldSelect name_label={'Municipio Destino'} data={currencies} id={'id_municipio_d'} name={'municipio_d'}/>
                            <FieldSelect name_label={'Regreso'} data={currencies} id={'id_regreso'} name={'regreso'}/>

                        </div>

                        <div>
                            <FieldSelect name_label={'Persona autorizada a Recibir y Loquidar el efectivo del grupo:'} data={currencies} id={'id_parleg'} name={'id_parleg'} />
                            <FieldSelect name_label={'Con Cargo al Presupuesto:'} data={currencies} id={'id_cargo_presupuesto'} name={'cargo_presupuesto'} />
                            <FieldSelect name_label={'Autoriza'} data={currencies} id={'id_autoriza'} name={'autoriza'} />
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

export default CreateSdhpModal;