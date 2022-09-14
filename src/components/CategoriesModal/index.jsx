import React, { useState } from 'react'
import { Box, Button, Typography, Modal, Grid, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';

const styleSelect = {
    background: '#FFFFFF',
    boxShadow: '0.5px solid #E2E8F0',
    color: '#A0AEC0'
}

export default function CategoriesModal() {
    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Change Form Categorias
    const [dadosTrans, setDadosTrans] = useState({
        Tipos: "",
        Nome: ""
    })

    const handleChangeTrans = (prop) => (event) => {
        setDadosTrans({ ...dadosTrans, [prop]: event.target.value });
    };

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
                    width: 481,
                    height: 160,
                    bgcolor: '#FFFFFF',
                    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                    borderRadius: 2,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h6">Adicionar Categoria</Typography>

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

                        <TextField
                            variant="outlined"
                            label="Nome"
                            onChange={handleChangeTrans('Nome')}
                            sx={{ width: '194px' }}
                        />

                        <Button variant="contained" onClick={() => formatarData()} >Adicionar</Button>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
