import React, { useState } from 'react'
import { Box, Button, Typography, Modal, Grid, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';
import api from '../../services/api'

//UTILS
import { pegarItem } from "../../utils/localStorage";

const styleSelect = {
    background: '#FFFFFF',
    boxShadow: '0.5px solid #E2E8F0',
    color: '#A0AEC0'
}

export default function CategoriesModal({
    abrirModal,
    setAbrirModal,
    typeCategories,
    dadosTrans,
    setDadosTrans
}) {

    //Modal
    function handleClose() {
        setAbrirModal(false)
        setDadosTrans({
            Tipos: "",
            Nome: ""
        })
    }

    //Change Form Categorias
    const handleChangeTrans = (prop) => (event) => {
        setDadosTrans({ ...dadosTrans, [prop]: event.target.value });
    };

    async function registerCategory() {
        if (dadosTrans.Tipos === "" || dadosTrans.Nome === "") {
            return console.log('Preencha todos os dados')
        }

        try {
            await api.post("/categoria", dadosTrans);

            setDadosTrans({
                Tipos: "",
                Nome: ""
            })

            setAbrirModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateCategory() {
        const idCategoria = pegarItem("categoriaId")

        if (dadosTrans.Tipos === "" || dadosTrans.Nome === "") {
            return console.log('Preencha todos os dados')
        }

        try {
            await api.put(`/categoria/${idCategoria}`, dadosTrans);

            setDadosTrans({
                Tipos: "",
                Nome: ""
            })

            setAbrirModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal
                open={abrirModal}
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
                        {typeCategories === 'Adicionar' ? 'Adicionar Categoria' : 'Editar Categoria'}</Typography>

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
                            value={dadosTrans.Nome}
                        />

                        <Button
                            onClick={typeCategories === 'Adicionar' ? () => registerCategory() : () => updateCategory()}
                            variant="contained"
                            sx={{
                                fontSize: {
                                    xs: "0.8rem",
                                },
                                fontWeight: "500",
                                backgroundColor: "transparent",
                                backgroundImage: "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
                                padding: "0.4rem 2rem",
                                textTransform: "none",
                                borderRadius: "0.5rem",
                                width: '111px'
                            }}
                        >
                            {typeCategories === 'Adicionar' ? 'Adicionar' : 'Atualizar'}</Button>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
