const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tickets = [];

app.get("/tickets", (req, res) => {
  res.json(tickets);
});

app.post("/tickets", (req, res) => {
  const ticket = {
    id: Date.now(),
    title: req.body.title,
    status: "Open"
  };

  tickets.push(ticket);
  res.json(ticket);
});

app.get("/system/status", (req, res) => {
  res.json({
    status: "Healthy",
    cpu: "40%",
    memory: "60%"
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
