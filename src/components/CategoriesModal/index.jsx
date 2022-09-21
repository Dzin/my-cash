import React from "react";
//MUI
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  alpha,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

//API
import api from "../../services/api";

//TOAST
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

//UTILS
import { pegarItem } from "../../utils/localStorage";

export default function CategoriesModal({
  abrirModal,
  setAbrirModal,
  typeCategories,
  dadosTrans,
  setDadosTrans,
  setCategories,
  tipoErro,
  setTipoErro,
  nomeErro,
  setNomeErro,
}) {
  function handleClose() {
    setAbrirModal(false);
    setDadosTrans({
      tipo: "",
      nome: "",
    });
  }

  const handleChangeTrans = (prop) => (event) => {
    setDadosTrans({ ...dadosTrans, [prop]: event.target.value });
  };

  function feedbackCobrancaSucesso(mensagem) {
    toast.success(mensagem, {
      icon: () => <CheckIcon color="primary" />,
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  function feedbackCobrancaFalha(mensagem) {
    toast.error(mensagem, {
      icon: () => <CloseIcon color="primary" />,
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  async function registerCategory(e) {
    e.preventDefault();

    setNomeErro("");
    setTipoErro("");

    if (!dadosTrans.tipo) {
      setTipoErro("Campo obrigatório");
      return;
    }

    if (!dadosTrans.nome) {
      setNomeErro("Campo obrigatório");
      return;
    }

    try {
      await api.post("/categoria", dadosTrans);

      setDadosTrans({
        tipo: "",
        nome: "",
      });

      api.get("/categoria").then((res) => {
        setCategories(res.data);
      });

      setAbrirModal(false);
      feedbackCobrancaSucesso("Categoria cadastrada com sucesso!");
    } catch (error) {
      feedbackCobrancaFalha("Oops... Tente mais tarde");
    }
  }

  async function updateCategory(e) {
    e.preventDefault();
    const idCategoria = pegarItem("categoriaId");

    setNomeErro("");

    if (!dadosTrans.nome) {
      setNomeErro("Campo obrigatório");
      return;
    }

    try {
      await api.put(`/categoria/${idCategoria}`, dadosTrans);

      setDadosTrans({
        tipo: "",
        nome: "",
      });

      api.get("/categoria").then((res) => {
        setCategories(res.data);
      });

      setAbrirModal(false);
      feedbackCobrancaSucesso("Categoria atualizada com sucesso!");
    } catch (error) {
      feedbackCobrancaFalha("Oops... Tente mais tarde");
    }
  }

  return (
    <Dialog
      open={abrirModal}
      onClose={handleClose}
      sx={{
        " .MuiPaper-root": {
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "29rem",
          padding: "1rem 0 0",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          //   padding: "1.5rem 1rem 0 1rem",
        }}
      >
        <DialogTitle sx={{ padding: "0" }} fontWeight="bold">
          {typeCategories === "Adicionar"
            ? "Adicionar Categoria"
            : "Editar Categoria"}
        </DialogTitle>

        <IconButton
          onClick={() => handleClose()}
          sx={{
            width: "2rem",
            height: "2rem",
            position: "absolute",
            right: -151,
            top: -8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: { xs: "1rem" } }}>
        <Grid
          container
          sx={{
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              borderRadius: "1rem",
            },
          }}
          spacing={1.5}
        >
          <Grid item xs={12} sm={4}>
            <FormControl size="small" fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                value={dadosTrans.tipo}
                onChange={handleChangeTrans("tipo")}
              >
                <MenuItem value="receita">Receita</MenuItem>
                <MenuItem value="despesa">Despesa</MenuItem>
              </Select>
              <FormHelperText
                sx={{
                  margin: 0,
                  padding: " .2rem .5rem 0",
                  color: "red",
                }}
              >
                {tipoErro}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              id="nome"
              label="Nome"
              name="description"
              size="small"
              variant="outlined"
              onChange={handleChangeTrans("nome")}
              value={dadosTrans.nome}
              fullWidth
            />
            <FormHelperText
              sx={{
                margin: 0,
                padding: " .2rem .5rem 0",
                color: "red",
              }}
            >
              {nomeErro}
            </FormHelperText>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              onClick={
                typeCategories === "Adicionar"
                  ? (e) => registerCategory(e)
                  : (e) => updateCategory(e)
              }
              variant="contained"
              fullWidth
              sx={{
                "&.MuiButtonBase-root": {
                  background:
                    "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
                  borderRadius: "1rem",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: `linear-gradient(136.64deg, ${alpha(
                      "#658DD1",
                      0.9
                    )} 1.59%, ${alpha("#2D3748", 0.9)} 98.89%)`,
                  },
                },
              }}
            >
              {typeCategories === "Adicionar" ? "Adicionar" : "Atualizar"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
