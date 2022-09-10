import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Button from '@mui/material/Button';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);

    const filteredCategories = categoryFilter.length > 0 ? categories.filter(category => categoryFilter.includes(category.tipo)) : categories;

    useEffect(() => {
        api.get('/categoria').then(resp => {
            setCategories(resp.data);
        });
    }, []);

    const addCategory = () => {
        console.log("Adicionar categoria!");
    }

    const editCategory = ( id ) => {
        console.log("Editar categoria!");
    }

    const deleteCategory = ( id ) => {
        console.log("Deletar categoria!");
    }

    return (
        <>
            <Grid sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
            }}>
                <Typography component="h3" sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#2D3748",
                }}>Categorias</Typography>
                <FormGroup sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "1rem",
                }}>
                    <FormControlLabel sx={{
                        margin: "0",
                    }} control={<Switch size="medium" onChange={ (e) => { e.target.checked ? setCategoryFilter([...categoryFilter, "receita"]) : setCategoryFilter(categoryFilter.filter( filter => filter !== "receita" )) } } />} label="Entrada" />
                    <FormControlLabel sx={{
                        margin: "0",
                    }} control={<Switch size="medium" onChange={ (e) => { e.target.checked ? setCategoryFilter([...categoryFilter, "despesa"]) : setCategoryFilter(categoryFilter.filter( filter => filter !== "despesa" )) } } />} label="Saída" />
                </FormGroup>
            </Grid>

            <List sx={{
                width: "100%",
                height: "15rem",
                overflowY: "scroll",
                paddingTop: "0",
                paddingBottom: "0",
                marginTop: "0.8rem",
                marginBottom: "0.8rem",
            }}>
            {
                filteredCategories.map( category => (
                    <ListItem key={category.id} sx={{
                        paddingTop: "0.2rem",
                        paddingBottom: "0.2rem",
                        paddingLeft: "0",
                        paddingRight: "0",
                    }}>
                        <ListItemIcon sx={{
                            minWidth: "0",
                            marginRight: "0.5rem",
                        }}>
                            {
                                category.tipo === "despesa" ?
                                    <ArrowCircleDownOutlinedIcon fontSize="medium" sx={{ color: "#E53E3E" }}/>
                                :
                                    <ArrowCircleUpOutlinedIcon fontSize="medium" sx={{ color: "#48BB78" }}/>
                            }
                        </ListItemIcon>
                        <ListItemText primary={category.nome} />
                        <IconButton aria-label="edit" onClick={ () => editCategory( category.id ) }>
                            <EditOutlinedIcon fontSize="medium" sx={{
                                color: "#000000",
                            }}/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={ () => deleteCategory( category.id ) }>
                            <DeleteForeverOutlinedIcon fontSize="medium" sx={{
                                color: "#000000",
                            }}/>
                        </IconButton>
                    </ListItem>     
                ))
            }
            </List>
            <Button variant="contained" sx={{
                backgroundColor: "none",
                backgroundImage: "linear-gradient(to bottom right, #658DD1 , #2D3748)",
                padding: "0.4rem 2rem",
                fontSize: "0.9rem",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "0.5rem"
            }} onClick={ () => addCategory() }>
                Adicionar
            </Button>
        </>
    );
}