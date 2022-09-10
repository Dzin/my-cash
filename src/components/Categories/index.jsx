import React, { useState, useEffect } from "react";

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

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);

    const filteredCategories = categoryFilter.length > 0 ? categories.filter(category => categoryFilter.includes(category.tipo)) : categories;
    
    console.log(categoryFilter);

    useEffect(() => {
        fetch(`https://gama-academy-api.herokuapp.com/categoria`)
            .then(resp => {
                resp.json()
                    .then(data => {
                        setCategories(data);
                    });
            })
            .catch(err => {
                console.log(`Erro: ${err}`);
            });
    }, []);

    const editCategory = ( id ) => {

    }

    const deleteCategory = ( id ) => {

    }

    return (
        <>
            <Grid>
                <Typography component="h3" sx={{ display: "inline-block" }}>Categorias</Typography>
                <FormGroup sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "2rem",
                }} >
                    <FormControlLabel sx={{
                        margin: 0,
                    }} control={<Switch size="medium" onChange={ (e) => { e.target.checked ? setCategoryFilter([...categoryFilter, 'receita']) : setCategoryFilter(categoryFilter.filter( filter => filter !== 'receita' )) } } />} label="Entrada" />
                    <FormControlLabel sx={{
                        margin: 0,
                    }} control={<Switch size="medium" onChange={ (e) => { e.target.checked ? setCategoryFilter([...categoryFilter, 'despesa']) : setCategoryFilter(categoryFilter.filter( filter => filter !== 'despesa' )) } } />} label="Saída" />
                </FormGroup>
            </Grid>

            <List sx={{ width: '100%' }} >
            {
                filteredCategories.map( category => (
                    <ListItem key={ category.id }>
                        <ListItemIcon>
                            {
                                category.tipo === 'despesa' ?
                                    <ArrowCircleDownOutlinedIcon fontSize="medium" sx={{ color: '#E53E3E' }} />
                                :
                                    <ArrowCircleUpOutlinedIcon fontSize="medium" sx={{ color: '#48BB78' }} />
                            }
                        </ListItemIcon>
                        <ListItemText primary={category.nome} />
                        <IconButton aria-label="edit" onClick={ () => editCategory( category.id ) }>
                            <EditOutlinedIcon fontSize="medium" sx={{ color: '#000000' }} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={ () => deleteCategory( category.id ) }>
                            <DeleteForeverOutlinedIcon fontSize="medium" sx={{ color: '#000000' }} />
                        </IconButton>
                    </ListItem>     
                ))
            }
            </List>
        </>
    );
}