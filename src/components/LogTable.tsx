import { useState, useEffect } from 'react'
import moment from 'moment';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {BASEURL} from '../constants'
import Paper from '@mui/material/Paper';

type Log = {
  id: string,
  created: string,
  message: string,
  bot: string,
  worker: string
};

type Logs = Log[];

const toolTipStyles = {fontSize:'16px', color: 'rgba(0, 0, 0, 0.87)', backgroundColor:'#FFF', margin: '-10px', border: '1px solid rgba(0, 0, 0, 0.87)', borderRadius: '2px', padding:'5px'};

const columns: GridColDef[] = [
  { field: 'created', headerName: 'Date Created', flex: 0.3 },
  { field: 'message', headerName: 'Message', flex: 1,
    renderCell: (params: any) =>  (
      <Tooltip title={<Typography sx={toolTipStyles}>{params.value.toString()}</Typography>} >
        <span className="table-cell-truncate">{params.value.toString()}</span>
      </Tooltip>
     ), 
  },
];

type LogTableProps ={
  selectedBotID: string,
  selectedWorkerID: string
};

export const LogTable = ({ selectedBotID, selectedWorkerID }: LogTableProps) => {
  const [logs, setLogs] = useState<Logs>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (selectedBotID) fetch(`${BASEURL}/logs?bot=${selectedBotID}${selectedWorkerID ? '&worker='+selectedWorkerID : ''}`)
      .then(response => response.json())
      .then(data => {
        setLogs(data.map((log: Log) =>  {log.created = moment(log.created).format('LLL'); return log}));
        setLoading(false);
      })
      .catch(error => console.error('Error:', error.msg));
    else setLogs([]);
  }, [selectedBotID, selectedWorkerID]);

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        loading={loading}
        slots={{ toolbar: () => (   
          <GridToolbarContainer>
            <h3 role='table-title'>Logs</h3>
          </GridToolbarContainer>
        )}}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'skeleton',
          },
        }}
        rows={logs}
        columns={columns}
        pageSizeOptions={[12,20,30]}
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