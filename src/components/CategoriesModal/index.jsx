import React, { useState } from 'react'
import { Box, Button, Typography, Modal, Grid, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';
import api from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconeFalha from "../../assets/icons/toastIconeFalha.svg";
import IconeSucesso from "../../assets/icons/toastIconeSucesso.svg";

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
    setDadosTrans,
    setCategories
}) {

    //Modal
    function handleClose() {
        setAbrirModal(false)
        setDadosTrans({
            tipo: "",
            nome: ""
        })
    }

    //Change Form Categorias
    const handleChangeTrans = (prop) => (event) => {
        setDadosTrans({ ...dadosTrans, [prop]: event.target.value });
    };

    function feedbackCobrancaSucesso(mensagem) {
        toast.success(mensagem, {
            icon: () => <img src={IconeSucesso} alt="sucesso" />,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            className: "corDeFundoSucesso",
        });
    }

    function feedbackCobrancaFalha(mensagem) {
        toast.success(mensagem, {
            icon: () => <img src={IconeFalha} alt="falha" />,
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            className: "corDeFundoFalha",
        });
    }

    async function registerCategory() {
        if (dadosTrans.tipo === "" || dadosTrans.nome === "") {
            return console.log('Preencha todos os dados')
        }

        try {
            await api.post("/categoria", dadosTrans);

            setDadosTrans({
                tipo: "",
                nome: ""
            })

            api.get("/categoria").then(res => {
                setCategories(res.data);
            });

            setAbrirModal(false)
            feedbackCobrancaSucesso("Categoria cadastrada com sucesso!");

        } catch (error) {
            feedbackCobrancaFalha("Oops... Tente mais tarde")
        }
    }

    async function updateCategory() {
        const idCategoria = pegarItem("categoriaId")

        if (dadosTrans.tipo === "" || dadosTrans.nome === "") {
            return console.log('Preencha todos os dados')
        }

        try {
            await api.put(`/categoria/${idCategoria}`, dadosTrans);

            setDadosTrans({
                tipo: "",
                nome: ""
            })

            api.get("/categoria").then(res => {
                setCategories(res.data);
            });

            setAbrirModal(false)
            feedbackCobrancaSucesso("Categoria atualizada com sucesso!");
        } catch (error) {
            feedbackCobrancaFalha("Oops... Tente mais tarde")
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
                                value={dadosTrans.tipo}
                                onChange={handleChangeTrans('tipo')}
                                sx={{ ...styleSelect, width: '113px', color: 'rgba(0, 0, 0, 0.87)' }}
                            >
                                <MenuItem value='receita'>Receita</MenuItem>
                                <MenuItem value='despesa'>Despesa</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            variant="outlined"
                            label="Nome"
                            onChange={handleChangeTrans('nome')}
                            sx={{ width: '194px' }}
                            value={dadosTrans.nome}
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
