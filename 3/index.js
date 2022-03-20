const express = require('express');
const mongodb = require("mongodb");

const port = process.env.port || 3000;
const app = express();

const mongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectId;
const dbUrl = "mongodb+srv:/<Username>:<Password>@cluster0.aeltb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.json());

/*
GET method
------------using .then method-------
app.get("/", (req, res) => {
  mongoClient.connect(dbUrl, (err, client) => {
      if(err) throw err;
      let db = client.db('films')
      db.collection('data').find().toArray().then(data =>{
        res.status(200).json(data)
        client.close();
      }).catch(err => {
        res.status(404).json({message:"No Data Found"})
        console.log(err.message);
      })
  })
})
*/

// GET method ------------------------

app.get("/", async (req, res) => {
  try {
    let client = await mongoClient.connect(dbUrl)
    let db = client.db('films')
    let data = await db.collection('data').find().toArray()
    console.log(res);
    if (data.length > 0) res.status(200).json(data)
    else res.status(404).json({message: "No data found"})
    client.close();
  } catch (error) {
      res.status(500).json({message: "Internal server error"})
  }
})

// POST method --------------------------

app.post("/create", async (req, res) => {
  try {
    let client = await mongoClient.connect(dbUrl)
    let db = client.db('films')
    // let client = await mongoClient.connect(dbUrl).db('films');
    await db.collection('data').insertOne(req.body)
    res.status(200).json({message: "Data Created"})
    client.close();
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
}
})

//PUT method ---------------------------------

app.put("/update/:id", async (req, res) => {
  try {
    let client = await mongoClient.connect(dbUrl)
    let db = client.db('films')
    // let client = await mongoClient.connect(dbUrl).db('films');
    await db.collection('data').findOneAndUpdate({_id: objectID(req.params.id)}, {$set: req.body})
    res.status(200).json({message: "Data updated"})
    client.close();
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
}
})

// DELETE method -------------------------------

app.delete("/delete/:id", async (req, res) => {
  try {
    let client = await mongoClient.connect(dbUrl)
    let db = client.db('films')
    // let client = await mongoClient.connect(dbUrl).db('films');
    await db.collection('data').deleteOne({_id: objectID(req.params.id)})
    res.status(200).json({message: "Data Delete"})
    client.close();
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
}
})

app.listen(port, () => console.log("Your app runs with" + port));

