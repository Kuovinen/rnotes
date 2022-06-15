const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

const connectionString =
  "mongodb+srv://XXX:YYY@cluster0.u1ysblp.mongodb.net/?retryWrites=true&w=majority";
async function accessDb() {
  const client = await MongoClient.connect(connectionString);
  const db = await client.db("rnotes");
  const notes = db.collection("notes");

  app.get("/", (req, res) => {
    db.collection("notes")
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
        res.send(JSON.stringify(results));
      })
      .catch((error) => console.error(error));

    // ...
  });
  //Add tab
  app.post("/addtab", (req, res) => {
    console.log(req.body.payload);
    res.send("adding tab");
  });
  //Add note
  app.post("/addnote", (req, res) => {
    notes
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));

    res.send("added note" + req.body.payload);
  });
  //Remove note
  app.get("/removenote", (req, res) => {
    res.send("removeing note");
  });

  app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
}
accessDb();
