import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {BASEURL} from '../constants'
import Paper from '@mui/material/Paper';

type Worker = {
  id: string,
  name: string,
  description: string,
  bot: string
}

type Workers = Worker[];

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
]

type DataTableProps ={
  selectedBotID: string,
  selectedBotName: string
}
export const DataTable = ({ selectedBotID, selectedBotName }: DataTableProps) => {
  const [workers, setWorkers] = useState<Workers>([])

  useEffect(() => {
    console.log('selectedBotName ', selectedBotName)
    fetch(`${BASEURL}/workers?bot=${selectedBotName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWorkers(data)
      })
      .catch(error => console.error('Error:', error.msg));
  }, [selectedBotName])

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={workers}
        columns={columns}
        pageSizeOptions={[]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};