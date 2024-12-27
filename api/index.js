const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE = process.env.MONGO_INITDB_DATABASE;
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

const client = new MongoClient(MONGODB_URI);
const db = client.db(MONGODB_DATABASE);
const collection = db.collection(MONGODB_COLLECTION);

const app = express();

app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/user", async (req, res) => {
  const body = req.body;

  console.log({ body });

  try {
    const user = await collection.insertOne(body);

    res.send(`User created with id: ${user.insertedId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});

app.get("/users", async (_, res) => {
  try {
    const users = await collection.find().toArray();

    res.send(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is listening on port", 3000);
});
