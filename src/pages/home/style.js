import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";
import BackgroungHeader from "../../assets/imgs/backgroundHeader.png";

export const BackgroundHeaderFilter = styled(Box)(({ theme }) => ({
  position: "absolute",
  opacity: theme.palette.mode === "light" ? 0.85 : 0.5,
  borderRadius: "1rem",
  width: "95%",
  margim: "0 0 0 0",
  height: "22rem",
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)"
      : "linear-gradient(136.64deg, #262930 1.59%, #2D3748 98.89%)",
  zIndex: 4,
  top: 12,
  left: "calc(2.5%)",
  right: 0,
  backgroundSize: "cover",
}));

export const BackgroundHeaderImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  opacity: theme.palette.mode === "light" ? 0.85 : 0.5,
  borderRadius: "1rem",
  width: "95%",
  margim: "0 0 0 0",
  height: "22rem",
  backgroundImage: `url(${BackgroungHeader})`,
  zIndex: 3,
  top: 12,
  left: "calc(2.5%)",
  right: 0,
  backgroundSize: "cover",
}));

export const GridFullContent = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "4rem 1rem 0 0",
  width: "calc(100% - 1rem)",
  gap: "1rem",
  position: "absolute",
  zIndex: 4,
  padding: "0 1.5rem",
  [theme.breakpoints.down("sm")]: {
    padding: "0 1rem",
  },
  maxWidth: "75rem",
}));

export const BackgroundColor = styled(Box)(({ theme }) => ({
  position: "absolute",
  opacity: "0.85",
  borderRadius: "1rem",
  width: "100%",
  margim: "0 0 0 0",
  height: "100%",
  background: "blue",
  zIndex: 2,
  top: 0,
  right: 0,
  backgroundSize: "cover",
}));
