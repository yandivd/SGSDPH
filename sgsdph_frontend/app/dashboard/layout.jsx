'use client'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import {useRouter} from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CancelIcon from '@mui/icons-material/Cancel';
import PaidIcon from '@mui/icons-material/Paid';
import ArchiveIcon from '@mui/icons-material/Archive';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {activeUser, inactiveUser} from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";
import {fetchConToken, fetchSinToken} from "../../helper/fetch";
import {modelo_detail_endpoint, trabajadores_endpoint, veryfy_token} from "../../constants/apiRoutes";
import {LogoutService} from "../../helper/LogoutService";
import Image from "next/image";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {DialogActions} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function Copyright(props) {
    return (
        <Typography variant="body2"
                    color="text.secondary"
                    align="center"
                    {...props}
        >
            {'Copyright © '}
            <Link href="https://www.etecsa.cu/" underline="hover">
                {'Etecsa"'}
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function PersistentDrawerLeft({children}) {
    const {user, isActive, rol} = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, control, handleSubmit, errors } = useForm();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openFirm, setOpenFirm] = React.useState(false);

    const handleFirmOpen = () => {
        setOpenFirm(!openFirm);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect( () => {
        const userAuthenticated = window.localStorage.getItem('token');

        if (userAuthenticated === null) {
            return router.push('/login');

        }else{
            fetchConToken(veryfy_token, userAuthenticated, "GET").then((isValid) => {
                if( isValid.status === 401){
                    window.localStorage.clear()
                    dispatch(inactiveUser())
                    router.push('/login')


                }else{
                    dispatch(activeUser( {
                        user: user ,
                    } ) );
                }
            })
        }
    }, [dispatch,router])

    if (isActive === null ) {
        return (
            <Loading infoText='Verificando permisos' />
        )
    }

    const handleLogout = async () =>{
        const userAuthenticated = window.localStorage.getItem('token');

        try {
            const resp = await fetchConToken(veryfy_token, userAuthenticated, "GET");
            const body = await resp.json();

            if (resp.status === 200) {
                const resp = await LogoutService( 'logout/', body.token, "POST");

                window.localStorage.clear()
                dispatch(inactiveUser())
                router.push('/login')
            }else{
                dispatch(inactiveUser())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitFirm = async(data) => {
        const id = window.localStorage.getItem('id');
        const method = "PATCH";
        const url = process.env.NEXT_PUBLIC_API_HOST + trabajadores_endpoint + id + '/';

        const formData= {
            "firma": data.firma[0]
        }
        console.log('formData', formData)

        try {
            const resp = await fetch( url, {
                method,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });

            console.log('response', resp)

            if (resp.status === 200) {
                Swal.fire('Exito', "Operación finaliza con éxito", 'success');
            }else{
                Swal.fire('Error', "Error del servidor", 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='d-flex w-100 align-items-center justify-content-between'>
                            <Typography variant='h6' noWrap component='div'>
                                Sistema de solcitud de dietas, hospedaje y pasaje
                            </Typography>
                            <div onClick={handleLogout} className={'logoutStyle'} >
                                <ListItemText>
                                    Cerrar Sesión
                                </ListItemText>
                                <ListItemIcon className={'ms-2 text-white'}>
                                    <LogoutIcon />
                                </ListItemIcon>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader className={'justify-content-between'}>
                        <div className={'ps-2  text-capitalize '}>
                            <Image
                                src= '/../logoCorto.jpeg'
                                alt= 'Logotipo'
                                width={ 180 }
                                height={ 80 }
                                className={'bg-sucess'}
                                priority={true}
                            />
                        </div>
                        <div>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                    </DrawerHeader>
                    <Divider className='bg-dark'/>
                    <List>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/'} className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText>Inicio</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleFirmOpen}>
                                <ListItemIcon>
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <ListItemText>Firma</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding >
                            <Link  href={'http://localhost:8000/admin'} className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SupervisorAccountIcon />
                                    </ListItemIcon>
                                    <ListItemText>Admin</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                    <Divider className='bg-dark'/>
                    <List>
                        <ListItem disablePadding className={'ps-3 text-underline'}>
                            <ListItemText>Solicitudes </ListItemText>
                        </ListItem>

                        <ListItem disablePadding disableGutters>
                            <Link href={'/dashboard/pendientes_solicitar'} className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText>Pendientes a Solicitar</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/pendientes_aprobar'} className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HowToRegIcon />
                                    </ListItemIcon>
                                    <ListItemText>Pendientes a Autorizar</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/solicitudes_anticipo_pago'}  className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon >
                                        <PaidIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Pendientes a Anticipo</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <Divider className='bg-dark'/>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/solicitudes_archivadas'} className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ArchiveIcon />
                                    </ListItemIcon>
                                    <ListItemText>Archivadas</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/solicitudes_canceladas'}  className='link-sidebar'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CancelIcon />
                                    </ListItemIcon>
                                    <ListItemText>Canceladas</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
                <Main open={open}  sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    height: '100vh',
                    overflow: 'auto',
                }}>
                    <DrawerHeader />

                    {children}

                    {/*                {React.Children.map(this.props.children, (child) =>
                    React.cloneElement(child, { models })
                )}*/}
                    <DrawerHeader />
                </Main>

            </Box>

            <div>
                <Dialog
                    onClose={handleFirmOpen}
                    aria-labelledby="customized-dialog-title"
                    open={openFirm}
                    className={'p-5'}
                >

                    <IconButton
                        aria-label="close"
                        onClick={handleFirmOpen}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <form onSubmit={handleSubmit(handleSubmitFirm)}>
                        <DialogContent className='text-center'>
                            <h4 className='mt-4'>Introduzca su firma digital</h4>
                            <TextField
                                required
                                type={'file'}
                                helperText="Firma"
                                sx={{ mx: 2, mt: 3, width: '300px' }}
                                {...register("firma")}
                            />

                            <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                                <Button autoFocus onClick={handleFirmOpen} variant="contained" color='error'>
                                    Cancelar
                                </Button> <br/>
                                <Button variant="contained" type="submit">
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>

            </div>
        </div>

    );
}

