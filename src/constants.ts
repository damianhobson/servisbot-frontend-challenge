export const BASEURL = "http://localhost:8080";
export const VIEWS = [
  { from: "Bots", to: "Workers", key: "bots_workers" },
  { from: "Bots", to: "Logs", key: "bots_logs" },
  { from: "Workers", to: "Logs", key: "workers_logs" },
];
export const STATUSCOLORS = {
  DISABLED: "red",
  PAUSED: "orange",
  ENABLED: "green",
};
