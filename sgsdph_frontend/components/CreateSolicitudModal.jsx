'use client'
import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";

const CreateSolicitudModal = ({isOpen, handleClose, setOpen}) => {
    const router = useRouter();

    const handleCreateDieta = () => {
        router.push('/dashboard/crear_solicitud_dieta')
        setOpen(false);
    };

    const handleCreateDHP = () => {
        router.push('/dashboard/crear_solicitud_dhp')
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Seleccione el tipo de solicitud
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

                <DialogContent>
                    <Button autoFocus onClick={handleCreateDieta}>
                        Solicitud de Dieta
                    </Button> <br/>
                    <Button autoFocus onClick={handleCreateDHP}>
                        Solicitud de Dieta, Hospedaje y Pasaje
                    </Button>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default CreateSolicitudModal;