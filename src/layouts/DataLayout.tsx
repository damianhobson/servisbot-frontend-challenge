import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2';
import { WorkerTable } from '../components/WorkerTable';
import { LogTable } from '../components/LogTable';
import { BotSelect } from '../components/BotSelect';
import { WorkerSelect } from '../components/WorkerSelect';
import { ViewSelect } from '../components/ViewSelect';
import {VIEWS} from '../constants'

export const DataLayout = () => {
  const [selectedView, setSelectedView] = useState(VIEWS[0].key);
  const [selectedBotID, setSelectedBotID] = useState('');
  const [selectedWorkerID, setSelectedWorkerID] = useState('');
  const [selectedBotName, setSelectedBotName] = useState('');
  
  useEffect(() => {
    if (selectedView === 'workers_logs') setSelectedWorkerID('');
  }, [selectedView])

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 , lg:3}}>
        <ViewSelect views={VIEWS} selectedView={selectedView} setSelectedView={setSelectedView}/>
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg:3 }}>
        <BotSelect selectedBotID={selectedBotID} setSelectedBotID={setSelectedBotID} setSelectedBotName={setSelectedBotName}/>
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg:3 }}>
        {selectedView === 'workers_logs' ? <WorkerSelect selectedWorkerID={selectedWorkerID} setSelectedWorkerID={setSelectedWorkerID} selectedBotName={selectedBotName}/> : ''}
      </Grid>

      <Grid size={12}>
        {selectedView === 'bots_workers' ?
          <WorkerTable selectedBotID={selectedBotID} selectedBotName={selectedBotName}/>
          :
          <LogTable selectedBotID={selectedBotID} selectedWorkerID={selectedWorkerID}/>
        }
      </Grid>
    </Grid> 
  );
};