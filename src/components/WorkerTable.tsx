import { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { BASEURL } from '../constants'
import Paper from '@mui/material/Paper';

type Worker = {
  id: string,
  name: string,
  description: string,
  bot: string
}

type Workers = Worker[];

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: .5 },
  { field: 'bot', headerName: 'Bot', flex: .5 },
  { field: 'description', headerName: 'Description', flex: 1 },
]

type WorkerTableProps = {
  selectedBotID: string,
  selectedBotName: string
}

export const WorkerTable = ({ selectedBotName }: WorkerTableProps) => {
  const [workers, setWorkers] = useState<Workers>([])

  useEffect(() => {
    fetch(`${BASEURL}/workers?bot=${selectedBotName}`)
      .then(response => response.json())
      .then(data => {
        setWorkers(data);
      })
      .catch(error => console.error('Error:', error.msg));
  }, [selectedBotName])

  return (
    <>
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        slots={{ toolbar: () => (   
          <GridToolbarContainer>
            <h3 role='table-title'>Workers</h3>
          </GridToolbarContainer>
        )}}
        rows={workers}
        columns={columns}
        pageSizeOptions={[]}
        sx={{ border: 0 }}
        data-testid='worker-table'
      />
    </Paper>
    </>
  );
};