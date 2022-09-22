// MUI
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Grid
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        size="2rem"
        sx={{
          color: "#658DD1",
        }}
      />
    </Grid>
  );
}
