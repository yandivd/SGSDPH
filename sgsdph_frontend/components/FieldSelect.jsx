import React from 'react';
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import { Controller } from 'react-hook-form';

const FieldSelect = ({name_label, data, name, value_show, control, isRequired}) => {

    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        select
                        required={isRequired}
                        label={name_label}
                        {...field}
                        sx={{ m: 2, width: '300px' }}
                    >
                        {data.map((option) => (
                            <MenuItem key={option.id}
                                      value={typeof option[value_show] === 'undefined' ? '' : option.id}
                            >
                                {typeof option[value_show] === 'undefined' ? '' : option[value_show]}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />


        </div>
    );
};



export default FieldSelect;
