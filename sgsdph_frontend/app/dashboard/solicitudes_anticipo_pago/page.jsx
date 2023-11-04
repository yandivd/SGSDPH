'use client'
import React, {useState} from 'react';
import axios from "axios";
import {anticipo_endpoint, modelo_detail_endpoint, modelo_endpoint} from "../../../constants/apiRoutes";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import {useEffect} from "react";
import {InputText} from "primereact/inputtext";
import {useRouter} from "next/navigation";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GradingIcon from '@mui/icons-material/Grading';
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {fetchSinToken} from "../../../helper/fetch";
import Swal from "sweetalert2";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SolicitudesAnticipoPago() {
    const [models, setModels] = React.useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const router = useRouter();
    const [rol, setRol] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(true);
    const [id, setId] = React.useState('');
    const [anticipo, setAnticipo] = React.useState(false);


    const handleViewModel = (id) => {
        router.push(`/previsualizar-model/${id}`);
    }

    const handleOpenAnticipo = ()  => {
        setAnticipo(!anticipo)
    }

    const generateAnticipo = (idmodel) =>{
        setId(idmodel)
        handleOpenAnticipo()
    }

    const getModels = async () => {

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + modelo_endpoint
        )
            .then(response => {
                const data = response.data.filter(objeto => objeto.estado === "PendienteAnticipo" );
                setModels(data);
                setLoading(false);
            })
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-primary" onClick={() => handleViewModel(rowData.id)}>
                    <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="success"  onClick={() => generateAnticipo(rowData.id)} >
                    <GradingIcon fontSize="inherit" />
                </IconButton>
            </>
        )
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderTabContent = (tipo_model) => {
        return(
            <div>
                <div className={'d-flex align-items-end justify-content-between mt-4'}>
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Filtrar..."
                        sx={{ mb:3 }}
                    />
                </div>
                <br/>

                <DataTable value={ models.filter((objeto) => objeto.tipo_model === tipo_model) }
                           paginator rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{ minWidth: '50rem' }}
                           globalFilter={globalFilter}
                           loading={loading}
                >
                    <Column field="consec" header="Consecutivo" sortable style={{ width: '25%' }}></Column>
                    <Column field="nombre" header="Creador" sortable style={{ width: '15%' }}></Column>
                    <Column field="unidad_organizativa" header="Unidad Organizativa" sortable style={{ width: '25%' }}></Column>
                    <Column field="c_contable" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                    <Column field="cargo_presupuesto" header="Cargo Presupuesto" sortable style={{ width: '25%' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
                </DataTable>

                <Dialog
                    onClose={handleOpenAnticipo}
                    aria-labelledby="customized-dialog-title"
                    open={anticipo}
                    className={'p-5'}
                >

                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    </DialogTitle>

                    <IconButton
                        aria-label="close"
                        onClick={handleOpenAnticipo}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogContent className='text-center'>
                        <h4 className='mt-4'>Estás seguro de generar el anticipo de pago de este modelo?</h4>
                    </DialogContent>


                    <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                        <Button autoFocus onClick={handleOpenAnticipo} variant="contained" color='error'>
                            Cancelar
                        </Button> <br/>
                        <Button onClick={() => handleGenerateAnticipo()} variant="contained">
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const handleGenerateAnticipo = async () => {
        const data = {
            modelo: id
        }
        try {
            const resp = await fetchSinToken(anticipo_endpoint, data, "POST");
            if (resp.status === 201) {
                const endpoint = modelo_detail_endpoint + id +'/'
                const new_models= models.filter(objeto => objeto.id !== id );
                setModels(new_models);

                const data = {
                    estado: 'AnticiposArchivado'
                }
                const resp = await fetchSinToken(endpoint, data, "PATCH");
                if (resp.status === 200) {
                    Swal.fire('Exito', "Operación finaliza con éxito", 'success');
                }else{
                    Swal.fire('Error', "Error del servidor", 'error');
                }
            }else{
                Swal.fire('Error', "Error del servidor", 'error');
            }

        } catch (error) {
            console.log(error)
        }
        if(anticipo){
            handleOpenAnticipo();
        }

    }


    useEffect( () => {
        setRol(window.localStorage.getItem('rol'));

        if(rol === 0 ){
            setShow(!show)
        }else{
            { rol !== '4' && rol !== '5' ?
                router.push('/login')
                :
                getModels()
            }
        }

    }, [show])

    return (
        <Box>
            <Box sx={{ borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab label="Solicitude de Dietas" {...a11yProps(0)} />
                    <Tab label="Solicitude de Dietas, Pasajes y hospedajes" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {renderTabContent(1)}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {renderTabContent(2)}
            </CustomTabPanel>
        </Box>
    );
}
