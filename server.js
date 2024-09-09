const express = require("express");
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors())

const jsonParser = bodyParser.json()

app.get("/status", (req, res) => {
  res.json({'status':'up'})
});

app.get("/bots", (req, res) => {
  console.log('bots called');
  let rawdata = fs.readFileSync('./data/bots.json');
  let bots = JSON.parse(rawdata);
  res.json(bots)
});

app.get("/workers", (req, res) => {
  console.log('workers called');
  let rawdata = fs.readFileSync('./data/workers.json');
  let workers = JSON.parse(rawdata);
  if (req.query.bot) workers = workers.filter((worker) => worker.bot === req.query.bot)
  res.json(workers)
});

//logs${selectedBotID ? '?bot='+selectedBotID : ''}${selectedWorkerID ? '?worker='+selectedWorkerID : ''
app.get("/logs", (req, res) => {
  console.log('logs called : bot ' , req.query.bot, ' | worker ', req.query.worker);
  let rawdata = fs.readFileSync('./data/logs.json');
  let logs = JSON.parse(rawdata);
  if (req.query.bot) logs = logs.filter((log) => log.bot === req.query.bot);
  if (req.query.worker) logs = logs.filter((log) => log.worker === req.query.worker)
  res.json(logs)
});

// app.post("/consents", jsonParser, (req, res) => {
//   let rawdata = fs.readFileSync('consents.json');
//   let consents = JSON.parse(rawdata)
//   consents.push(req.body)
//   let data = JSON.stringify(consents);
//   fs.writeFileSync('consents.json', data);
//   res.json({'success': true})
// });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});