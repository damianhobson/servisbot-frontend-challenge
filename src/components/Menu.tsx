import Button from '@mui/material/Button';
import TableChartIcon from '@mui/icons-material/TableChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Stack from '@mui/material/Stack';

export const Menu = () => {

  return (
    <Stack
    direction={{ xs: 'row', sm: 'column' }}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Button variant="contained" endIcon={<TableChartIcon />}>
          Data Dive
      </Button>

      <Button variant="outlined" endIcon={<SmartToyIcon />}>
          Editor
      </Button>
    </Stack>
  )
}
