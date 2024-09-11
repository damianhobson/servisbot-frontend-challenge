import Grid from "@mui/material/Grid2";
import { BotEditor } from "../components/BotEditor";

export const EditLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <BotEditor />
      </Grid>
    </Grid>
  );
};
