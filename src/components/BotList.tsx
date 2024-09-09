import { useState, useEffect } from 'react'
import { BASEURL } from '../constants'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ListItemText from '@mui/material/ListItemText';
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


const statusColor= {'DISABLED':'red', 'PAUSED': 'orange', 'ENABLED': 'green'};

export const BotList = () => {
  const [bots, setBots] = useState<Bots>([])
  useEffect(() => {
    fetch(`${BASEURL}/bots`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBots(data);
      })
      .catch(error => console.error('Error:', error.msg));
  }, [])


  return (
    <List>
      {bots.map(({name, description, status}) => (
        <ListItem secondaryAction={
          <>
            <IconButton edge="end" aria-label="pause">
              <PauseCircleIcon />
            </IconButton>
            <IconButton edge="end" aria-label="disable">
              <StopCircleIcon />
            </IconButton>
          </>
        }>
        <ListItemAvatar>
          <Avatar>
            <SmartToyIcon sx={{color: statusColor[status] || 'grey'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={name}
            secondary={description}
          />
        </ListItem>
      ))}

    </List>
  );
};