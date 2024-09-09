import Grid from '@mui/material/Grid2';
// import { BotList } from './components/BotList';
import { DataLayout } from './layouts/DataLayout';
// import { BotSelect } from './components/BotSelect';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        Name
      </Grid>
      <Grid size={3}>
        {/* <BotList/>
        <BotSelect/> */}
      </Grid>
      <Grid size={9}>
        <DataLayout/>
      </Grid>
    </Grid> 
  )
}

export default App
