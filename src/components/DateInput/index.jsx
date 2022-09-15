import React from "react";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import "dayjs/locale/pt-br";

export const DateInput = ({ handleSelectMonth }) => {
  const [date, setDate] = useState(null);

  return (
    <LocalizationProvider adapterLocale={"pt-br"} dateAdapter={AdapterDayjs}>
      <DatePicker
        openTo="month"
        views={["month", "year"]}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          handleSelectMonth(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
