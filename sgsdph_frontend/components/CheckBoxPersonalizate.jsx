import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {FormGroup} from "@mui/material";
import React from "react";
import {Controller} from "react-hook-form";


const CheckBoxPersonalizate = ({data, control}) => {
    return (
        <FormGroup sx={{ m: 2, py: 1, px: 2, width: '300px', border: '1px solid #ccc' }}>
            { data.map( (data) => (
                <Controller
                    key={data.id}
                    name={`checkbox_${data.id}`} // Asigna un nombre único para cada campo Checkbox
                    control={control}
                    defaultValue= '' // Valor inicial del campo Checkbox
                    render={({ field }) => (
                        <FormControlLabel
                            key={data.id}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value === data.id} // Establece el valor del Checkbox basado en el estado
                                    onChange={(e) => field.onChange(e.target.checked ? data.id : '')}
                                />
                            }
                            label={data.nombre}
                        />
                    )}
                />
            ))
            }
        </FormGroup>

    );
};

export default CheckBoxPersonalizate;


