import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2';
import { BotList } from '../components/BotList';


export const EditLayout = () => {
  // const [selectedView, setSelectedView] = useState(VIEWS[0].key);
  // const [selectedBotID, setSelectedBotID] = useState('');
  // const [selectedWorkerID, setSelectedWorkerID] = useState('');
  // const [selectedBotName, setSelectedBotName] = useState('');
  
  // useEffect(() => {
  //   if (selectedView === 'workers_logs') setSelectedWorkerID('');
  // }, [selectedView])

  return (
    <Grid container spacing={2}>

      <Grid size={12}>
        <BotList/>
      </Grid>
    </Grid> 
  );
};