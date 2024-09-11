import { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ListItemText from "@mui/material/ListItemText";
import { BASEURL } from "../../constants";
import { STATUSCOLORS } from "../../constants";

enum Statuses {
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
  PAUSED = "PAUSED",
}
type Bot = {
  id: string;
  name: string;
  description: string;
  status: Statuses;
};
type Bots = Bot[];
type Status = {
  id: string;
  status: Statuses;
};

export const BotEditor = () => {
  const [bots, setBots] = useState<Bots>([]);
  const [updateBot, setUpdateBot] = useState<Status>();

  useEffect(() => {
    fetch(`${BASEURL}/bots`)
      .then((response) => response.json())
      .then((data) => {
        setBots(data);
      })
      .catch((error) => console.error("Error:", error.msg));
  }, []);

  useEffect(() => {
    if (updateBot)
      fetch(`${BASEURL}/changestatus`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(updateBot),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.success) {
            setBots(response.bots);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, [updateBot]);

  return (
    <List sx={{ maxWidth: "500px" }}>
      {bots.map(({ id, name, description, status }) => (
        <ListItem
          key={id}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                disabled={status === "ENABLED"}
                onClick={() =>
                  setUpdateBot({ id: id, status: Statuses["ENABLED"] })
                }
                aria-label="enable"
              >
                <PlayCircleIcon sx={{ fontSize: "40px" }} />
              </IconButton>
              <IconButton
                edge="end"
                disabled={status === "PAUSED"}
                onClick={() =>
                  setUpdateBot({ id: id, status: Statuses["PAUSED"] })
                }
                aria-label="pause"
              >
                <PauseCircleIcon sx={{ fontSize: "40px" }} />
              </IconButton>
              <IconButton
                edge="end"
                disabled={status === "DISABLED"}
                onClick={() =>
                  setUpdateBot({ id: id, status: Statuses["DISABLED"] })
                }
                aria-label="disable"
              >
                <StopCircleIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <SmartToyIcon sx={{ color: STATUSCOLORS[status] || "grey" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={description} />
        </ListItem>
      ))}
    </List>
  );
};
