import React, { useState } from 'react'
import { Box, Button, Typography, Modal, Grid, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { money } from '../../utils/formatter'

const styleSelect = {
    background: '#FFFFFF',
    boxShadow: '0.5px solid #E2E8F0',
    color: '#A0AEC0'
}

export default function TransactionModal() {
    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Change Form Transação 
    const [dadosTrans, setDadosTrans] = useState({
        Tipos: "",
        Categorias: "",
        Descricao: "",
        Valor: ""
    })

    const handleChangeTrans = (prop) => (event) => {
        setDadosTrans({ ...dadosTrans, [prop]: event.target.value });
    };

    //Change Form Transação - Data
    const [dadoDateTrans, setDadoDateTrans] = useState(null);

    function formatarData() {
        const DateNew = dayjs(dadoDateTrans.$d).format('DD/MM/YYYY')

        console.log({ ...dadosTrans, Valor: dadosTrans.Valor.replace(/[^\w\s]|\s|[A-Z]/gi, ''), Data: DateNew })
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1000,
                    height: 160,
                    bgcolor: '#FFFFFF',
                    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                    borderRadius: 2,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Typography
                        component="h3"
                        fontWeight="700"
                        fontSize={{
                            xs: "1.2rem",
                        }}
                        textAlign={{
                            sm: "left",
                            xs: "center",
                        }}
                        color="#2D3748"
                    >
                        Adicionar Transação</Typography>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormControl>
                            <InputLabel>Tipos</InputLabel>
                            <Select
                                label="Tipos"
                                value={dadosTrans.Tipos}
                                onChange={handleChangeTrans('Tipos')}
                                sx={{ ...styleSelect, width: '113px', color: 'rgba(0, 0, 0, 0.87)' }}
                            >
                                <MenuItem value='Entrada'>Entrada</MenuItem>
                                <MenuItem value='Saída'>Saída</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{
                            background: '#FFFFFF',
                            width: '170px',
                            color: '#A0AEC0',
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    inputFormat="DD/MM/YYYY"
                                    label="Data"
                                    value={dadoDateTrans}
                                    onChange={(newValue) => {
                                        setDadoDateTrans(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl >
                            <InputLabel>Categorias</InputLabel>
                            <Select
                                label="Categoria"
                                value={dadosTrans.Categorias}
                                onChange={handleChangeTrans('Categorias')}
                                sx={{ ...styleSelect, width: '194px', color: 'rgba(0, 0, 0, 0.87)' }}
                            >
                                <MenuItem value='Entradas'>Entrada</MenuItem>
                                <MenuItem value='Saídas'>Saída</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            variant="outlined"
                            label="Descrição"
                            onChange={handleChangeTrans('Descricao')}
                            sx={{ width: '194px' }}
                        />

                        <TextField
                            variant="outlined"
                            label="Valor"
                            onChange={handleChangeTrans('Valor')}
                            value={money(dadosTrans.Valor)}
                            sx={{ width: '117px' }}
                        />

                        <Button
                            onClick={() => formatarData()}
                            variant="contained"
                            sx={{
                                fontSize: {
                                    xs: "0.8rem",
                                },
                                fontWeight: "700",
                                backgroundColor: "transparent",
                                backgroundImage: "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
                                padding: "0.4rem 2rem",
                                textTransform: "none",
                                borderRadius: "0.5rem",
                                width: '111px'
                            }}

                        >
                            Adicionar</Button>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
