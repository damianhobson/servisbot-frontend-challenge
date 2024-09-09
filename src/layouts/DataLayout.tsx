import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2';

import { DataTable } from '../components/DataTable';
import { LogTable } from '../components/LogTable';
import { BotSelect } from '../components/BotSelect';
import { WorkerSelect } from '../components/WorkerSelect';
import { ViewSelect } from '../components/ViewSelect';
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
const views = [{from:'Bots', to: 'Workers', key: 'bots_workers'}, {from:'Bots', to:'Logs', key: 'bots_logs'}, {from:'Workers', to:'Logs', key: 'workers_logs'}];

export const DataLayout = () => {
  const [selectedView, setSelectedView] = useState(views[0].key);

  const [selectedBotID, setSelectedBotID] = useState('');
  const [selectedWorkerID, setSelectedWorkerID] = useState('');
  const [selectedBotName, setSelectedBotName] = useState('');
  
  useEffect(() => {
    console.log('workers_logs')
    if (selectedView === 'workers_logs') setSelectedWorkerID('');
  }, [selectedView])

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <ViewSelect views={views} selectedView={selectedView} setSelectedView={setSelectedView}/>
      </Grid>
      <Grid size={3}>
        <BotSelect selectedBotID={selectedBotID} setSelectedBotID={setSelectedBotID} setSelectedBotName={setSelectedBotName}/>
      </Grid>
      <Grid size={3}>
        {selectedView === 'workers_logs' ? <WorkerSelect selectedWorkerID={selectedWorkerID} setSelectedWorkerID={setSelectedWorkerID} selectedBotName={selectedBotName}/> : ''}
      </Grid>
      <Grid size={3}>
      </Grid>
      <Grid size={12}>
        {selectedView === 'bots_workers' ?
          <DataTable selectedBotID={selectedBotID} selectedBotName={selectedBotName}/>
          :
          <LogTable selectedBotID={selectedBotID} selectedWorkerID={selectedWorkerID}/>
        }
      </Grid>
    </Grid> 
  );
};