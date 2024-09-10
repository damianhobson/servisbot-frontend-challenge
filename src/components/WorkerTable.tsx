import { useState, useEffect } from "react";
import moment from "moment";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { BASEURL } from "../constants";
import Paper from "@mui/material/Paper";

type Worker = {
  id: string;
  name: string;
  description: string;
  bot: string;
  created: number | string;
};

type Workers = Worker[];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 0.5 },
  { field: "bot", headerName: "Bot", flex: 0.5 },
  { field: "description", headerName: "Description", flex: 1 },
  { field: "created", headerName: "Date Created", flex: 1 },
];

type WorkerTableProps = {
  selectedBotID: string;
  selectedBotName: string;
};

export const WorkerTable = ({ selectedBotName }: WorkerTableProps) => {
  const [workers, setWorkers] = useState<Workers>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASEURL}/workers?bot=${selectedBotName}`)
      .then((response) => response.json())
      .then((data) => {
        setWorkers(
          data.map((worker: Worker) => {
            worker.created = moment(worker.created).format("LLL");
            return worker;
          })
        );
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error.msg));
  }, [selectedBotName]);

  return (
    <>
      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          loading={loading}
          slots={{
            toolbar: () => (
              <GridToolbarContainer>
                <h3 role="table-title">Workers</h3>
              </GridToolbarContainer>
            ),
          }}
          slotProps={{
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "skeleton",
            },
          }}
          rows={workers}
          columns={columns}
          pageSizeOptions={[100]}
          sx={{ border: 0 }}
          data-testid="worker-table"
        />
      </Paper>
    </>
  );
};
