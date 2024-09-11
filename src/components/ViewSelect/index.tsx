import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type View = {
  from: string,
  to: string,
  key: string
}

type ViewSelectProps = {
  views: View[],
  selectedView: string,
  setSelectedView: Function
}

export const ViewSelect = ({views, selectedView, setSelectedView }:ViewSelectProps) => {

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedView(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='view-select-label'>Views</InputLabel>
      <Select
        labelId='view-select-label'
        id='view-select'
        data-testid='view-select'
        value={selectedView}
        label='Views'
        onChange={handleChange}
      >
      {views.map(({from, to, key}: View) => (
        <MenuItem value={key} key={key}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <div data-testid={`view-select-${key}`}>{from} {<ArrowForwardIcon fontSize='small' sx={{'marginBottom': '-5px'}}/>} {to}</div>
          </Box>
        </MenuItem>
      ))}
      </Select>
    </FormControl>
  );
};