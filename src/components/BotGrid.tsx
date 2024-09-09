import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
enum Statuses{
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
  PAUSED = 'PAUSED',
}
type BotProps = {
  id: string,
  name: string,
  description: string,
  status: Statuses
}
type Bots = BotProps[];

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'status', headerName: 'Status', width: 120 },
]
// const paginationModel = { page: 0, pageSize: 5 };
export const BotGrid = () => {
  const [bots, setBots] = useState<Bots>([])
  useEffect(() => {
    fetch('http://localhost:8080/bots')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBots(data);
      })
      .catch(error => console.error('Error:', error.msg));
  }, [])


  useEffect(() => {
    fetch('http://localhost:8080/workers?bot=Bot Two')
      .then(response => response.json())
      .then(data => {
        console.log(data);

      })
      .catch(error => console.error('Error:', error.msg));
  }, [])

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={bots}
        columns={columns}
    
        pageSizeOptions={[]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};