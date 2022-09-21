import React, { useState } from "react";
// MUI
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
//ICONS
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Loading from "../Loading";
//STYLES

//COMPONENTS
import { ToggleType } from "../ToggleType";
import CategoriesModal from "../CategoriesModal";

//UTILS
import { adicionarItem, pegarItem } from "../../utils/localStorage";

export default function Categories(props) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [typeCategories, setTypeCategories] = useState("");
  const [dadosTrans, setDadosTrans] = useState({
    tipo: "",
    nome: "",
  });
  const [tipoErro, setTipoErro] = useState("");
  const [nomeErro, setNomeErro] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const filteredCategories =
    categoryFilter.length > 0
      ? props.categories.filter((category) =>
          categoryFilter.includes(category.tipo)
        )
      : props.categories;

  const handleToggleType = function (category) {
    setCategoryFilter(category || "");
  };

  async function addCategory() {
    setAbrirModal(true);
    setTypeCategories("Adicionar");
    setNomeErro("");
    setTipoErro("");
  }

  const editCategory = (category) => {
    setNomeErro("");
    setTipoErro("");
    setAbrirModal(true);
    setTypeCategories("Editar");

    adicionarItem("categoriaId", category._id);
    adicionarItem("categoriaNome", category.nome);
    adicionarItem("categoriaTipo", category.tipo);
    const nomeCategoria = pegarItem("categoriaNome");
    const tipoCategoria = pegarItem("categoriaTipo");

    setDadosTrans({
      tipo: tipoCategoria,
      nome: nomeCategoria,
    });
  };

  const deleteCategory = (id) => {
    console.log("Deletar categoria!");
  };

  return (
    <>
      <Grid
        padding={{
          md: "1.2rem 1.5rem",
          xs: "1.5rem 1.2rem",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            alignItems: "center",
            justifyContent: {
              sm: "space-between",
              xs: "center",
            },
            gap: {
              sm: "1rem",
              xs: "0.5rem",
            },
          }}
        >
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
            Categorias
          </Typography>
          <ToggleType handleToggleType={handleToggleType} />
        </Grid>
        <List
          sx={{
            width: "100%",
            height: "15rem",
            overflowY: "scroll",
            paddingTop: "0",
            paddingBottom: "0",
            marginTop: "1rem",
            marginBottom: "1rem",
            "&::-webkit-scrollbar": {
              width: 5,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#F8F9FA",
              borderRadius: "1.2rem",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(136.64deg, #658DD1 0%, #2D3748 100%)",
              borderRadius: "1.2rem",
            },
          }}
        >
          {props.loading ? (
            <Loading />
          ) : (
            filteredCategories.map((category) => (
              <ListItem
                key={category._id}
                sx={{
                  paddingTop: "0.2rem",
                  paddingBottom: "0.2rem",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "0",
                    marginRight: "0.5rem",
                  }}
                >
                  {category.tipo === "despesa" ? (
                    <ArrowCircleDownOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: "#E53E3E",
                      }}
                    />
                  ) : (
                    <ArrowCircleUpOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: "#48BB78",
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={category.nome}
                  primaryTypographyProps={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                    },
                  }}
                />
                <IconButton
                  aria-label="edit"
                  onClick={() =>
                    editCategory(category)
                  }
                >
                  <EditOutlinedIcon
                    fontSize="small"
                    sx={{
                      color: "#000000",
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteCategory(category.id)}
                >
                  <DeleteForeverOutlinedIcon
                    fontSize="small"
                    sx={{
                      color: "#000000",
                    }}
                  />
                </IconButton>
              </ListItem>
            ))
          )}
        </List>
        <Button
          variant="contained"
          sx={{
            fontSize: {
              xs: "0.8rem",
            },
            fontWeight: "500",
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
            padding: "0.4rem 2rem",
            textTransform: "none",
            // borderRadius: "0.5rem",
          }}
          onClick={() => addCategory()}
        >
          Adicionar
        </Button>
      </Grid>
      <CategoriesModal
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        typeCategories={typeCategories}
        dadosTrans={dadosTrans}
        setDadosTrans={setDadosTrans}
        setCategories={props.setCategories}
        nomeErro={nomeErro}
        setNomeErro={setNomeErro}
        tipoErro={tipoErro}
        setTipoErro={setTipoErro}
      />
    </>
  );
}
