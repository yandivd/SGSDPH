import {useState} from "react";

//este custom hook es para los formularios, creamos un estado de los valores pasados y un metdo q mantiene los
// valores y modifica el pasado por parametro

//antes recogiamos los valores de los form con el luguanje d programacion del backend pero aqui lo estamos haciendo
// con js con un hook, resivimos el valor y lo ponemos en un useState y lo retornamos con el metodo q hace q se
// complete toodo lo q escibimos en el input
export const useForm = ( initialState ) => {
    const [values, setValues] = useState(initialState);

    //metodo q permite limpiar el formulario
    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({target}) => {
        //metodo que hace q cada vez q escribimos algo en el input actualice el state con lo q tenia y lo q vamos
        // escribiendo, pues se escribe letra a letra
        setValues({
            ...values,
            [target.name]: target.value
        })
    };

    return [values, handleInputChange, reset];
};

