import { useState } from 'react'
import Grid from '@mui/material/Grid2';

import { DataTable } from '../components/DataTable';
import { BotSelect } from '../components/BotSelect';
// enum Statuses{
//   DISABLED = 'DISABLED',
//   ENABLED = 'ENABLED',
//   PAUSED = 'PAUSED',
// }
// type BotProps = {
//   id: string,
//   name: string,
//   description: string,
//   status: Statuses
// }
// type Bots = BotProps[];


export const DataLayout = () => {
  // const [bots, setBots] = useState<Bots>([])
  const [selectedBotID, setSelectedBotID] = useState('');
  const [selectedBotName, setSelectedBotName] = useState('');
  
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <BotSelect selectedBotID={selectedBotID} setSelectedBotID={setSelectedBotID} setSelectedBotName={setSelectedBotName}/>
      </Grid>
      <Grid size={9}>
        
      </Grid>
      <Grid size={12}>
        <DataTable selectedBotID={selectedBotID} selectedBotName={selectedBotName}/>
      </Grid>
    </Grid> 
  );
};