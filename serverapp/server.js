const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//Add tab
app.post("/addtab", (req, res) => {
  console.log(req.body.payload);
  res.send("adding tab");
});
//Add note
app.post("/addnote", (req, res) => {
  console.log(req.body.payload);
  res.send("adding note");
});
//Remove note
app.get("/removenote", (req, res) => {
  res.send("removeing note");
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
