import { useState, useEffect } from 'react'
import {BASEURL} from '../constants'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type WorkerProps = {
  id: string,
  name: string,
  description: string,
  bot: string,
}

type Workers = WorkerProps[];

type WorkerSelectProps = {
  selectedWorkerID: string,
  setSelectedWorkerID: Function,
  selectedBotName: string
}

export const WorkerSelect = ({ selectedWorkerID, setSelectedWorkerID, selectedBotName}: WorkerSelectProps) => {
  const [workers, setWorkers] = useState<Workers>([]);

  useEffect(() => {
    fetch(`${BASEURL}/workers${selectedBotName ? '?=' + selectedBotName : ''}`)
      .then(response => response.json())
      .then(data => {
        console.log('SETTING WORKERS : ', data);
        setWorkers(data);
      })
      .catch(error => console.error('Error:', error.msg));
  }, [selectedBotName]);

  useEffect(() => {
    setSelectedWorkerID(() => workers.filter(worker => worker.id === selectedWorkerID)[0]?.id || '')
  }, [selectedWorkerID]);
  
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedWorkerID(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="worker-select-label">Worker</InputLabel>
      <Select
        labelId="worker-select-label"
        id="worker-select"
        value={selectedWorkerID}
        label="Worker"
        onChange={handleChange}
      >
      {workers.filter(worker => worker.bot === selectedBotName).map(({id, name}) => (
        <MenuItem value={id} key={id}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <div>{name}</div>
          </Box>
        </MenuItem>
      ))}
      </Select>
    </FormControl>
  );
};