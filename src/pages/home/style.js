import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";
import BackgroungHeader from "../../assets/imgs/backgroundHeader.png";

export const BackgroundHeaderFilter = styled(Box)(({ theme }) => ({
  position: "absolute",
  opacity: "0.85",
  borderRadius: "1rem",
  width: "95%",
  margim: "0 0 0 0",
  height: "22rem",
  background: "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
  zIndex: -1,
  top: 12,
  left: "calc(2.5%)",
  right: 0,
  backgroundSize: "cover",
}));
export const BackgroundHeaderImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  opacity: "0.85",
  borderRadius: "1rem",
  width: "95%",
  margim: "0 0 0 0",
  height: "22rem",
  backgroundImage: `url(${BackgroungHeader})`,
  zIndex: -2,
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
  margin: "4.4rem 0 0 0",
  width: "100%",
  gap: "1rem",
}));
