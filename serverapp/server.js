const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "./credentials.env" });

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

const connectionString = `mongodb+srv://${process.env.USRNM}:${process.env.PSWD}@cluster0.u1ysblp.mongodb.net/?retryWrites=true&w=majority`;
async function accessDb() {
  const client = await MongoClient.connect(connectionString);
  const db = await client.db("rnotes");
  const notes = db.collection("notes");
  const music = db.collection("music");
  async function getNames() {
    //get collection names
    const currentCollections = await db.listCollections().toArray();
    const collectionNames = currentCollections.map((element) => element.name);
    return collectionNames;
  }
  /*  THIS WILL BE THE GET NOTES
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
  });*/

  app.get("/", async (req, res) => {
    console.log(await getNames());
    res.send(JSON.stringify(await getNames()));
    // ...
  });
  //Add tab
  app.post("/addtab", async (req, res) => {
    const collectionNames = await getNames();
    //make collection if not in list already
    if (!collectionNames.includes(req.body.payload)) {
      db.createCollection(req.body.payload);
      res.send("adding tab:" + req.body.payload);
    } else {
      res.send("collection seems to already exist");
    }
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
