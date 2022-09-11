import React, { useState, useEffect } from "react";
//MUI
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
} from "@mui/material";
//DATE
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br";
//ICONS
import CloseIcon from "@mui/icons-material/Close";
//API
import api from "../../../services/api";

export default function TransactionRegistration({ open, setOpen, categories }) {
  const [type, setType] = useState("");
  const [date, setDate] = useState(null);
  const [categorie, setCategorie] = useState({});
  const [description, setDescription] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const [optionsCategories, setOptionsCategories] = useState([]);
  const [valueMoney, setValueMoney] = useState(null);
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
  React.useEffect(() => {
    if (!openCategories) {
      setOptionsCategories([]);
    }
  }, [openCategories]);

  const handleChangeInputType = (event) => {
    setType(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      sx={{
        " .MuiPaper-root": {
          padding: "2rem 1rem 1rem",
          borderRadius: "1rem",
          maxWidth: "70rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle sx={{ padding: "0" }} fontWeight="bold">
          Adicionar Transação
        </DialogTitle>
        <IconButton sx={{ width: "2rem", height: "2rem" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Grid
          container
          sx={{
            margin: "0.4rem 0 0 0",
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              borderRadius: "1rem",
            },
          }}
          spacing={1}
        >
          <Grid item xs md>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Tipo"
                onChange={handleChangeInputType}
              >
                <MenuItem value={"receita"}>Receita</MenuItem>
                <MenuItem value={"despesa"}>Despesa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs md>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"pt-br"}
            >
              <DatePicker
                size="small"
                label="Data"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs md>
            <Autocomplete
              onChange={(event, newValue) => {
                setCategorie(newValue);
              }}
              // value={categorie?.nome}
              size="small"
              id="categoria"
              options={optionsCategories}
              getOptionLabel={(option) => option.nome}
              onOpen={() => {
                setOpenCategories(true);
              }}
              onClose={() => {
                setOpenCategories(false);
              }}
              noOptionsText="Carregando..."
              loadingText={"Carregando..."}
              isOptionEqualToValue={(option, value) =>
                option.nome === value.nome
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categoria"
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
          </Grid>
          <Grid item xs md>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="descrição"
              label="Descrição"
              variant="outlined"
              size="small"
              multiline
            />
          </Grid>
          <Grid item xs md>
            <TextField
              value={valueMoney}
              onChange={(e) => setValueMoney(e.target.value)}
              id="Valor"
              label="Valor"
              variant="outlined"
              size="small"
              type={"number"}
            />
          </Grid>
          <Grid item xs md>
            <Button
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
      </DialogContent>
    </Dialog>
  );
}
