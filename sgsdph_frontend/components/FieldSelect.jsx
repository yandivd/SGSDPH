import React from 'react';
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";

const FieldSelect = ({name_label, data, id, name, value_show}) => {

    return (
        <div>
            <TextField
                id={id}
                select
                label={name_label}
                name={name}
                sx={{ m: 2, width: '300px' }}
            >
                {data.map((option) => (
                    <MenuItem key={option.id}
                              value={typeof option[value_show] === 'undefined' ? '' : option[value_show]}
                    >
                        {typeof option[value_show] === 'undefined' ? '' : option[value_show]}
                    </MenuItem>
                ))}
            </TextField>

        </div>
    );
};



export default FieldSelect;
