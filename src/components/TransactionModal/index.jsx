import React, { useState, useEffect } from "react";
//MUI
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  IconButton,
  Autocomplete,
  CircularProgress,
  FormHelperText,
  alpha,
  InputAdornment,
} from "@mui/material";
//DATE
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br";
//ICONS
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
//API
import api from "../../services/api";
// VALIDATION
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//HELPERS
import { toast } from "react-toastify";
import { moneyMask } from "../../utils/formatter";
let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
import { pegarItem } from "../../utils/localStorage";
const schema = yup
  .object({
    type: yup.string().required("Selecione um tipo"),
    date: yup
      .date()
      .default(() => new Date())
      .required("Selecione uma data"),
    categorie: yup
      .object({
        _id: yup.string().required("Selecione uma categoria"),
      })
      .typeError("Selecione uma categoria")
      .required("Selecione uma categoria"),
    description: yup.string(),
    valueTransaction: yup
      .string()
      .required("Adicione um valor")
      .notOneOf(["0,0"], "Adicione um valor")
      .test("differentFromZero", "Adicione um valor", (val) => {
        let differentFromZero = false;
        for (let i = 0; i < val.length; i++) {
          switch (val[i]) {
            case "0":
              break;
            case ".":
              break;
            case ",":
              break;
            default:
              differentFromZero = true;
          }
        }

        return differentFromZero;
      }),
  })
  .required();

export default function TransactionModal({
  open,
  setOpen,
  categories,
  typeTransactions,
  selectTransaction,
}) {
  const [openCategories, setOpenCategories] = useState(false);
  const [optionsCategories, setOptionsCategories] = useState([]);
  const loadingCategories = openCategories && optionsCategories.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingCategories) {
      return undefined;
    }

    (async () => {
      let data;
      await api.get("/categoria").then((res) => (data = res.data)); // For demo purposes.

      if (active) {
        setOptionsCategories(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingCategories]);

  useEffect(() => {
    if (!openCategories) {
      setOptionsCategories([]);
    }
  }, [openCategories]);

  const handleClose = () => {
    setOpen(false);
    // reset();
  };

  // FORM VALIDATIONS
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    resetField,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: undefined,
      date: new Date(),
      categorie: { _id: "", nome: "", tipo: "" },
      description: "",
      valueTransaction: "",
    },
  });

  useEffect(() => {
    selectTransaction?.categoria?.tipo &&
      setValue("type", selectTransaction?.categoria?.tipo);
    selectTransaction?.data && setValue("date", dayjs(selectTransaction?.data));
    selectTransaction?.categoria?._id &&
      setValue("categorie._id", selectTransaction?.categoria?._id);
    selectTransaction?.categoria?.nome &&
      setValue("categorie.nome", selectTransaction?.categoria?.nome);
    selectTransaction?.categoria?.tipo &&
      setValue("categorie.tipo", selectTransaction?.categoria?.tipo);
    selectTransaction?.descricao &&
      setValue("description", selectTransaction?.descricao);
    selectTransaction?.valor &&
      setValue("valueTransaction", selectTransaction?.valor?.toFixed(2));
  }, [selectTransaction]);

  let typeWatch = watch("type");
  let categoriesWatch = watch("categorie");

  useEffect(() => {
    if (typeWatch && categoriesWatch) {
      (async () => {
        setValue("categorie", null);

        await trigger("categorie");
      })();
    }
  }, [typeWatch]);

  useEffect(() => {
    categoriesWatch && trigger("categorie");
  }, [categoriesWatch]);

  const addTransactions = async (data) => {
    try {
      await api.post("/transacao", {
        tipo: data.type,
        valor: Number(
          moneyMask(data.valueTransaction).replace(".", "").replace(",", ".")
        ),
        categoria: data.categorie._id,
        descricao: data.description,
        data: dayjs(data.date).format("YYYY-MM-DD"),
      });

      toast.success("Transação atualizada", {
        icon: () => <CheckIcon color="primary" />,
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      handleClose();
      reset();
    } catch (error) {
      console.error(error.message);
      toast.error("Não foi possível cadastrar a transação", {
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
  };

  const updateTransactions = async (data) => {
    const idTransacao = selectTransaction._id;

    try {
      await api.put(`/transacao/${idTransacao}`, {
        tipo: data.type,
        valor: Number(
          moneyMask(data.valueTransaction).replace(".", "").replace(",", ".")
        ),
        categoria: data.categorie._id,
        descricao: data.description,
        data: dayjs(data.date).format("YYYY-MM-DD"),
      });

      toast.success("Transação atualizada", {
        icon: () => <CheckIcon color="primary" />,
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      handleClose();
      reset();
    } catch (error) {
      console.error(error.message);
      toast.error("Não foi possível atualizar transação", {
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
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        reset();
      }}
      sx={{
        " .MuiPaper-root": {
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          maxWidth: "68rem",
          // height: '11rem'
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "1.5rem 1rem 0 1rem",
        }}
      >
        <DialogTitle sx={{ padding: "0" }} fontWeight="bold">
          {typeTransactions === "Editar"
            ? "Atualizar transação"
            : "Adicionar transação"}
        </DialogTitle>
        <IconButton
          onClick={() => {
            handleClose();
            reset();
          }}
          sx={{
            width: "2rem",
            height: "2rem",
            position: "absolute",
            right: 7,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: { xs: "1rem" } }}>
        <form
          onSubmit={
            typeTransactions === "Editar"
              ? handleSubmit(updateTransactions)
              : handleSubmit(addTransactions)
          }
        >
          <Grid
            container
            sx={{
              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                borderRadius: "1rem",
              },
            }}
            spacing={1.5}
          >
            <Grid item xs={12} md={4} sm={6} lg={2}>
              <FormControl
                fullWidth
                size="small"
                error={!!errors.type?.message}
              >
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type"
                      label="Tipo"
                    >
                      <MenuItem value={"receita"}>Receita</MenuItem>
                      <MenuItem value={"despesa"}>Despesa</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.type?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={2}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"pt-br"}
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      {...field}
                      size="small"
                      label="Data"
                      name="date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          error={errors.date?.message}
                          helperText={
                            fieldState.error?.message &&
                            "Selecione uma data válida"
                          }
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={2}>
              <Controller
                control={control}
                name="categorie"
                render={({ field: { onChange, value }, fieldState }) => (
                  <Autocomplete
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={value}
                    size="small"
                    id="categoria"
                    options={optionsCategories.filter(
                      (categoria) => categoria.tipo === getValues().type
                    )}
                    getOptionLabel={(option) => option.nome}
                    onOpen={() => {
                      setOpenCategories(true);
                    }}
                    onClose={() => {
                      setOpenCategories(false);
                    }}
                    noOptionsText="Não existe opções"
                    loadingText={"Carregando..."}
                    isOptionEqualToValue={(option, value) =>
                      option.nome === value.nome
                    }
                    disabled={!getValues().type}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categoria"
                        error={fieldState.error?.message}
                        helperText={
                          fieldState.error?.message
                            ? fieldState.error?.message
                            : !getValues().type
                            ? "Selecione o tipo da transação"
                            : false
                        }
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loadingCategories ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={2}>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id="descrição"
                    label="Descrição"
                    name="description"
                    variant="outlined"
                    size="small"
                    multiline
                    error={fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={2}>
              <Controller
                name="valueTransaction"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      {...field}
                      value={
                        getValues().valueTransaction !== ""
                          ? moneyMask(String(getValues().valueTransaction))
                          : "0,00"
                      }
                      label="Valor"
                      id="valueTransaction"
                      variant="outlined"
                      size="small"
                      error={fieldState.error?.message}
                      helperText={fieldState.error?.message}
                      fullWidth
                      sx={{
                        "& input": {
                          fontWeight: "700",
                          color: `${
                            getValues().type === "receita"
                              ? "#5CAB7D"
                              : getValues().type === "despesa"
                              ? "#ff6a6a"
                              : "none"
                          }`,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={6} lg={2}>
              <Button
                type="submit"
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
                {typeTransactions === "Editar" ? "Atualizar" : "Adicionar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
