const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//Add tab
app.get("/addtab", (req, res) => {
  console.log("got here");
  res.send("adding tab");
});
//Add note
app.get("/addnote", (req, res) => {
  res.send("adding note");
});
//Remove note
app.get("/removenote", (req, res) => {
  res.send("removeing note");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
