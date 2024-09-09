import { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import {BASEURL} from '../constants'
import Paper from '@mui/material/Paper';

type Log = {
  id: string,
  date: string,
  message: string,
  bot: string,
  worker: string
}

type Logs = Log[];

const columns: GridColDef[] = [
  { field: 'created', headerName: 'Date', width: 130 },
  { field: 'message', headerName: 'Description', width: 130 },
]

type DataTableProps ={
  selectedBotID: string,
  selectedWorkerID: string
}
export const LogTable = ({ selectedBotID, selectedWorkerID }: DataTableProps) => {

  const [logs, setLogs] = useState<Logs>([])
  useEffect(() => {
    fetch(`${BASEURL}/logs${selectedBotID ? '?bot='+selectedBotID : ''}${selectedWorkerID ? '&worker='+selectedWorkerID : ''}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLogs(data)
      })
      .catch(error => console.error('Error:', error.msg));
  }, [selectedBotID, selectedWorkerID])

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        slots={{ toolbar: () => (   
          <GridToolbarContainer>
            <h3>Logs</h3>
          </GridToolbarContainer>
        )}}
        rows={logs}
        columns={columns}
        pageSizeOptions={[10,20,30]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};