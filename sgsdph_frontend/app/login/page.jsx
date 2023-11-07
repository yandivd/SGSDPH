'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {activeUser} from "../../redux/features/auth/authSlice";
import {useForm} from "react-hook-form";
import {fetchSinToken} from "../../helper/fetch";
import {useState} from "react";
import Image from 'next/image'



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Etecsa
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const {isActive} = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        setLoading(true)

        setErrorMessage('')

        try {
            const resp = await fetchSinToken('/login/', data, "POST");
            const body = await resp.json();

            if (resp.status === 201) {
                const rol = body.user.rol;
                const unidad_organizativa = body.user.unidad_organizativa;
                const first_name = body.user.first_name;
                const username = body.user.username;
                const token = body.token;
                const last_name = body.user.last_name;
                const id = body.user.id;

                dispatch(activeUser( {
                    user: username ,
                    rol: rol
                } ) );

                window.localStorage.setItem('username', username)
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('unidad_organizativa', unidad_organizativa)
                window.localStorage.setItem('first_name', first_name)
                window.localStorage.setItem('last_name', last_name)
                window.localStorage.setItem('id', id)
                window.localStorage.setItem('rol', rol)

                router.push('/dashboard')
            }else{
                if (resp.status === 400) {
                    setErrorMessage('Credenciales incorrectas')
                } else {
                    console.log(resp.status, error)
                }
            }
        } catch (error) {
            setErrorMessage('Error de conexión con el servidor')
            console.log(error)
        }

        setLoading(false)
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={ '/../logo.jpg'}
                        alt={ 'Logotipo' }
                        width={ 300 }
                        height={ 150 }
                        className={'bg-sucess'}
                    />
{/*                    <Typography component="h1" variant="h5">
                        Ingrese sus credenciales
                    </Typography>*/}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Usuario"
                            name="username"
                            type="text"
                            autoFocus
                            disabled={loading}
                            {...register("username", {
                                required: 'Campo requerido'
                            })}
                            error={errors.username}
                            helperText={errors.username && errors.username.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label='Contraseña'
                            type="password"
                            id="password"
                            disabled={loading}
                            {...register('password',
                                {required: 'Campo requerido'})}

                            error={errors.password}
                            helperText={errors.password && errors.password.message}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        />
                        {errorMessage && <div className='error-message text-danger'>{errorMessage}</div>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            Acceder
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}