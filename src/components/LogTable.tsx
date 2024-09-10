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
};

type Logs = Log[];

const columns: GridColDef[] = [
  { field: 'created', headerName: 'Date', flex: 0.3 },
  { field: 'message', headerName: 'Message', flex: 1 },
];

type LogTableProps ={
  selectedBotID: string,
  selectedWorkerID: string
};

export const LogTable = ({ selectedBotID, selectedWorkerID }: LogTableProps) => {

  const [logs, setLogs] = useState<Logs>([]);

  useEffect(() => {
    if (selectedBotID) fetch(`${BASEURL}/logs?bot=${selectedBotID}${selectedWorkerID ? '&worker='+selectedWorkerID : ''}`)
      .then(response => response.json())
      .then(data => {
        setLogs(data)
      })
      .catch(error => console.error('Error:', error.msg));
      else setLogs([]);
  }, [selectedBotID, selectedWorkerID]);

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        slots={{ toolbar: () => (   
          <GridToolbarContainer>
            <h3 role='table-title'>Logs</h3>
          </GridToolbarContainer>
        )}}
        rows={logs}
        columns={columns}
        pageSizeOptions={[10,20,30]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        sx={{ border: 0 }}
        data-testid='log-table'
      />
    </Paper>
  );
};