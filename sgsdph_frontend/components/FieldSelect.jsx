import React from 'react';
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";

const FieldSelect = ({name_label, data, id, name}) => {
    return (
        <div>
            <TextField
                id={id}
                select
                fullWidth
                label={name_label}
                name={name}
                defaultValue="-"
                sx={{ m: 2, width: '300px' }}
            >
                {data.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

        </div>
    );
};

export default FieldSelect;