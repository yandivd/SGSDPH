'use client'
import * as React from 'react';
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
import '../../styles/home-globals.css'
import '../../styles/sgsdhStyle.css'
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
    justifyContent: 'flex-end',
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const router = useRouter();

    const handleLogout = () =>{
        router.push('/login')
    }
    return (
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
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
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
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText>Admin</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider className='bg-dark'/>
                <List>
                    <ListItem disablePadding className={'ps-3 text-underline'}>
                        <ListItemText>Solicitudes </ListItemText>
                    </ListItem>

                    <ListItem disablePadding disableGutters>
                        <Link disable href={'/dashboard/pendientes_solicitar'} className='link-sidebar'>
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
                                <ListItemText>Pendientes a Aprobar</ListItemText>
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
                <DrawerHeader />
            </Main>

        </Box>
    );
}

