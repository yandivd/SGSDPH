'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {anticipo_endpoint, modelo_endpoint} from "../../../constants/apiRoutes";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {InputText} from "primereact/inputtext";
import {useRouter} from "next/navigation";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {DialogActions} from "@mui/material";
import Button from "@mui/material/Button";

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

export default function AnticiposArchivados() {
    const [anticipo, setAnticipo] = React.useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const router = useRouter();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(true);


    const getAnticipo = async () => {

        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + anticipo_endpoint
        )
            .then(response => {
                setAnticipo(response.data);
                setLoading(false);
            })
    }

    const handleViewModel = (id) => {
        router.push(`/previsualizar-anticipo/${id}`);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-primary" onClick={() => handleViewModel(rowData.id)}>
                    <VisibilityIcon fontSize="inherit" />
                </IconButton>
            </>
        )
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log('ejfirfjri', anticipo.filter((objeto) => objeto.modelo.tipo_model === 2))

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

                <DataTable value={ anticipo.filter((objeto) => objeto.modelo.tipo_model === tipo_model) }
                           paginator rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{ minWidth: '50rem' }}
                           globalFilter={globalFilter}
                           loading={loading}
                >
                    <Column field="id" header="Consecutivo" sortable style={{ width: '25%' }}></Column>
                    <Column field="fecha" header="Fecha" sortable style={{ width: '15%' }}></Column>
                    <Column field="modelo.unidad_organizativa" header="Unidad Organizativa" sortable style={{ width: '25%' }}></Column>
                    <Column field="modelo.c_contable" header="Centro Contable" sortable style={{ width: '25%' }}></Column>
                    <Column field="modelo.cargo_presupuesto" header="Cargo Presupuesto" sortable style={{ width: '25%' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
                </DataTable>

            </div>
        )
    }

    useEffect( () => {
        getAnticipo();

    }, [])

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
