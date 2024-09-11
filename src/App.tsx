import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { DataLayout } from "./layouts/DataLayout";
import { EditLayout } from "./layouts/EditLayout";
import { Menu } from "./components/Menu/";
import logo from "./assets/servisbot-logo.png";

function App() {
  const [page, setPage] = useState("data");
  return (
    <Grid container spacing={2}>
      <Grid
        size={12}
        sx={{
          borderBottom: "2px solid rgba(0, 0, 0, 0.4)",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        <img src={logo} />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <Menu page={page} setPage={setPage} />
        <Grid
          size={{ xs: 12 }}
          sx={{
            "@media (max-width: 900px)": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
              marginBottom: "20px",
              padding: "10px",
            },
          }}
        ></Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 10 }}>
        {page === "data" ? <DataLayout /> : <EditLayout />}
      </Grid>
    </Grid>
  );
}

export default App;
