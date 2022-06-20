const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config({ path: "./credentials.env" });

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

const connectionString = `mongodb+srv://${process.env.USRNM}:${process.env.PSWD}@cluster0.u1ysblp.mongodb.net/?retryWrites=true&w=majority`;
async function accessDb() {
  const client = await MongoClient.connect(connectionString);
  const db = await client.db("rnotes");
  async function getNames() {
    //get collection names
    const currentCollections = await db.listCollections().toArray();
    const collectionNames = currentCollections.map((element) => element.name);
    return collectionNames;
  }
  app.get("/", async (req, res) => {
    res.send(JSON.stringify(await getNames()));
    // ...
  });
  app.post("/getnotes", async (req, res) => {
    //check if collection is among the ones present
    const collections = await getNames();
    if (collections.includes(req.body.payload)) {
      const notes = await db.collection(req.body.payload).find().toArray();
      res.send(JSON.stringify(notes));
    }
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
    db.collection(req.body.tab)
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));

    res.send("added note" + req.body.payload);
  });
  //Remove note
  app.delete("/removenote/:tab/:id", async (req, res) => {
    const collectionNames = await getNames();
    if (collectionNames.includes(req.params.tab)) {
      console.log(req.params);
      res.send("removeing note: " + req.params.id + " from: " + req.params.tab);
      const result = await db
        .collection(req.params.tab)
        .deleteOne({ _id: new ObjectId(req.params.id) });

      console.log(result);
    }
  });

  app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
}
accessDb();
