import { useState, useEffect } from "react";
import { BASEURL } from "../../constants";
import { STATUSCOLORS } from "../../constants";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

enum Statuses {
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
  PAUSED = "PAUSED",
}
type BotProps = {
  id: string;
  name: string;
  description: string;
  status: Statuses;
};
type Bots = BotProps[];
type BotSelectProps = {
  selectedBotID: string;
  setSelectedBotID: Function;
  setSelectedBotName: Function;
};

export const BotSelect = ({
  selectedBotID,
  setSelectedBotID,
  setSelectedBotName,
}: BotSelectProps) => {
  const [bots, setBots] = useState<Bots>([]);

  useEffect(() => {
    fetch(`${BASEURL}/bots`)
      .then((response) => response.json())
      .then((data) => {
        setBots(data);
      })
      .catch((error) => console.error("Error:", error.msg));
  }, []);

  useEffect(() => {
    setSelectedBotName(
      () => bots.filter((bot) => bot.id === selectedBotID)[0]?.name || ""
    );
  }, [selectedBotID]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBotID(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="bot-select-label">Bot</InputLabel>
      <Select
        labelId="bot-select-label"
        id="bot-select"
        data-testid="bot-select"
        value={selectedBotID}
        label="Bots"
        onChange={handleChange}
      >
        {bots.map(({ id, name, status }) => (
          <MenuItem value={id} key={id}>
            <Box
              data-testid={`bot-select-item_${id}`}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>{name}</div>
              <CircleIcon
                fontSize="small"
                sx={{ color: STATUSCOLORS[status] || "grey" }}
              />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
