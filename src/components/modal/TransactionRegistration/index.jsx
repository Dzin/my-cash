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
} from "@mui/material";
//DATE
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br";
//ICONS
import CloseIcon from "@mui/icons-material/Close";
//API
import api from "../../../services/api";
// VALIDATION
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//HELPERS
import { toast } from "react-toastify";
import { CollectionsOutlined } from "@mui/icons-material";

let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
const schema = yup
  .object({
    type: yup.string().required("Selecione um tipo"),
    date: yup
      .date()
      .default(() => new Date())
      .required("Selecione uma data"),
    categorie: yup.string().required("Selecione uma categoria"),
    description: yup.string(),
    valueTransaction: yup
      .number()
      .typeError("Valor deve ser um número")
      .min(0.01, "Valor não pode ser menor que 0.01")
      .required("Adicione um valor")
      .test("is-decimal", "Máximo dois dígitos após a vírgula", (val) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }),
  })
  .required();

export default function TransactionRegistration({ open, setOpen, categories }) {
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
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: undefined,
      date: new Date(),
      categorie: undefined,
      description: "",
      valueTransaction: 0,
    },
  });
  let typeWatch = watch("type");
  let categoriesWatch = watch("categorie");

  useEffect(() => {
    if (typeWatch && categoriesWatch) {
      (async () => {
        resetField("categorie");
        await trigger("categorie");
      })();
    }
  }, [typeWatch]);

  useEffect(() => {
    categoriesWatch && trigger("categorie");
  }, [categoriesWatch]);

  const onSubmit = async (data) => {
    console.log("SUBTMIT");
    // await api
    //   .post("/transacao", {
    //     tipo: data.type,
    //     valor: data.valueTransaction.toFixed(2),
    //     categoria: data.categorie,
    //     descricao: data.description,
    //     data: dayjs(data.date).format("YYYY-MM-DD"),
    //   })
    //   .then((res) => {
    //     toast.success("Transação cadastrada");
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     console.error(error.message);
    //     toast.error("Não foi possível cadastrar a transação");
    //   });
    reset();
  };

  return (
    <Dialog
      open={true}
      onClose={() => {
        handleClose();
        reset();
      }}
      sx={{
        " .MuiPaper-root": {
          padding: "1rem 0 0",
          borderRadius: "1rem",
          maxWidth: "80rem",
          margin: { xs: "1rem", sm: "2rem" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <DialogTitle sx={{ padding: "0" }} fontWeight="bold">
          Adicionar Transação
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
            top: -8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: { xs: "0 1rem 1rem" } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              margin: "0.4rem 0 0 0",
              padding: "0 2rem 0 0",
              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                borderRadius: "1rem",
              },
            }}
            spacing={2}
          >
            <Grid item xs={12} sm={6} md={2}>
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
            <Grid item xs={12} sm={6} md={2}>
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
            <Grid item xs={12} sm={6} md={2}>
              <Controller
                control={control}
                name="categorie"
                render={({ field: { onChange, value }, fieldState }) => (
                  <Autocomplete
                    onChange={(event, item) => {
                      onChange(item.id);
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
                      option.nome === value
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
            <Grid item xs={12} sm={6} md={2}>
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
            <Grid item xs={12} sm={6} md={2}>
              <Controller
                name="valueTransaction"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      {...field}
                      value={getValues().valueTransaction}
                      type={"number"}
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
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                type="submit"
                onClick={handleClose}
                variant="contained"
                fullWidth
                sx={{
                  "&.MuiButtonBase-root": {
                    background:
                      "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
                    borderRadius: "1rem",
                    textTransform: "capitalize",
                  },
                }}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
