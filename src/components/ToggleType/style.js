import { ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/system";

export const ToggleButtonGroupStyled = styled(ToggleButtonGroup)(
  ({ theme, value }) => ({
    height: "40px",
    borderRadius: "1rem",
    "& .MuiToggleButton-root": {
      textTransform: "none",
      "&.Mui-selected": {
        color: "#FFFFFF",
        backgroundColor: "transparent",
        backgroundImage: "linear-gradient(136.64deg, #658DD1 0%, #2D3748 100%)",
      },
    },
    " .MuiButtonBase-root": {
      borderRadius: "1rem",
      //   minWidth: "60px",
    },
  })
);
