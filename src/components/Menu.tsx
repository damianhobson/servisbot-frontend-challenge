import Button from '@mui/material/Button';
import TableChartIcon from '@mui/icons-material/TableChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Stack from '@mui/material/Stack';


type MenuProps = {
  page: string,
  setPage: Function
}

export const Menu = ({page, setPage}: MenuProps) => {
  const handleClick = (event: any) => {
    console.log(event.target.value)
    setPage(event.target.value as string);
  };

  return (
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Button variant={page === 'data' ? "contained" : 'outlined'} onClick={handleClick} value='data'  endIcon={<TableChartIcon />}>
          Data Dive
      </Button>

      <Button variant={page === 'edit' ? "contained" : 'outlined'} onClick={handleClick} value='edit' endIcon={<SmartToyIcon />}>
          Editor
      </Button>
    </Stack>
  )
}
