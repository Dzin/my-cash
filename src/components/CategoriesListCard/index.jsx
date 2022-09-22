import React, { useState } from "react";
import { toast } from "react-toastify";
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
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
//STYLES

//COMPONENTS
import CategoriesModal from "../CategoriesModal";
import Loading from "../Loading";
import { NoResultText } from "../NoResultText";
import { ToggleType } from "../ToggleType";

//UTILS
import { adicionarItem } from "../../utils/localStorage";
import api from "../../services/api";

export default function Categories({
  categories,
  setCategories,
  loading,
  setLoading,
  abrirModal,
  setAbrirModal,
}) {
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
      ? categories.filter((category) => categoryFilter.includes(category.tipo))
      : categories;

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

    setDadosTrans({
      tipo: category.tipo,
      nome: category.nome,
    });
  };

  const deleteCategory = (id) => {
    api
      .delete(`/categoria/${id}`)
      .then(() => {
        toast.success("Categoria deletada com sucesso", {
          icon: () => <CheckIcon color="primary" />,
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setCategories(categories.filter((category) => category._id !== id));
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Não foi possível deletar a categoria", {
          icon: () => <CloseIcon color="primary" />,
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setLoading(false);
      });
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
            height: "20rem",
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
          {loading ? (
            <Loading />
          ) : filteredCategories.length === 0 ? (
            <NoResultText />
          ) : (
            filteredCategories
              .sort((a, b) => {
                const name1 = a.nome,
                  name2 = b.nome;

                if (name1 < name2) {
                  return -1;
                }

                if (name1 > name2) {
                  return 1;
                }

                return 0;
              })
              .map((category) => (
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
                    onClick={() => editCategory(category)}
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
                    onClick={() => deleteCategory(category._id)}
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
        setCategories={setCategories}
        nomeErro={nomeErro}
        setNomeErro={setNomeErro}
        tipoErro={tipoErro}
        setTipoErro={setTipoErro}
      />
    </>
  );
}
