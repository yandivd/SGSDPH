import React from 'react';
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import { Controller } from 'react-hook-form';

const FieldSelect = ({name_label, data, name, value_show1,value_show2, control, isRequired, width='300px'}) => {

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
                        sx={{ m: 2, width: width }}
                    >
                        {data.map((option) => (
                            <MenuItem key={option.id}
                                      value={typeof option[value_show1] === 'undefined' ? '' : option.id}
                            >
                                {typeof option[value_show1] === 'undefined' ?
                                    ''
                                    :
                                    option[value_show1] + (typeof option[value_show2] === 'undefined' ? ''
                                            :
                                         ' ' + option[value_show2])
                                }
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />


        </div>
    );
};



export default FieldSelect;
