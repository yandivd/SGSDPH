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
            // label: '¥',
        },
    ];

    return (
        <div>
            <h1> dietas hospedja e...</h1>

        </div>
    );
};

export default CreateSdhpModal;