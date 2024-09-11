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
  let rawdata = fs.readFileSync('./data/bots.json');
  let bots = JSON.parse(rawdata);
  res.json(bots)
});

app.get("/workers", (req, res) => {
  let rawdata = fs.readFileSync('./data/workers.json');
  let workers = JSON.parse(rawdata);
  if (req.query.bot) workers = workers.filter((worker) => worker.bot === req.query.bot)
  res.json(workers)
});

app.get("/logs", (req, res) => {
  const rawdata = fs.readFileSync('./data/logs.json');
  let logs = JSON.parse(rawdata);
  if (req.query.bot) logs = logs.filter((log) => log.bot === req.query.bot);
  if (req.query.worker) logs = logs.filter((log) => log.worker === req.query.worker)
  res.json(logs)
});

app.post("/changestatus", jsonParser, (req, res) => {
  fs.readFile('./data/bots.json', (err, rawdata) => {
    if (err) console.log(err);
    else { 
      let bots = JSON.parse(rawdata);
      const botID = req.body.id;
      const botStatus = req.body.status;
      if (!botID || !botStatus) res.json({ 'success': false });
      bots = bots.map((bot) => {
        if (bot.id === botID) bot.status = botStatus;
        return bot;
      })
      let data = JSON.stringify(bots);
      fs.writeFile('./data/bots.json', data, (err) => {
        if (err) {
          console.log(err);
          res.json({ 'success': false });
        } else {
          console.log("Bots updated successfully\n");
          res.json({ 'success': true, 'bots': bots })
        }
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});