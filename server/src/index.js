// const assert = require('assert');
const bodyParser = require("body-parser");
const co = require('co');
const env = require('dotenv');
const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

env.config();

const PORT = process.env.PORT || 6000;
const uri = process.env.MONGOLAB_URI;
const client  = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const find = function (db, col) {
  return co(function * () {
    const dbo = db.db('brtstravapoints');
    const collection = dbo.collection(col);
    const docs = yield collection.find({}).toArray();
    return docs;
  })
};

const sortedEntries = function(entries, lines) {
  entries.map((entry, index) => {
    entry.engines.map((engine) => {
      const matchedLine = lines.find(line => line.name === engine.line);
      engine.color = matchedLine.color;
    })
    entry.number = index;
  })
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

express()
  .use(express.static(path.join(__dirname, 'client/dist')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .get('/', (res) => res.render('client/dist/server/pages/index.js'))
  .get('/getEntries', function(req, res) {
    co(function * () {
      console.log(uri);
      const db = yield client.connect(uri, { useNewUrlParser: true })
      const entries = sortedEntries(
        yield find(db, 'results'),
        yield find(db, 'segments')
      );
      res.end(JSON.stringify(entries))
      db.close()
    }).catch(err => console.log(err))
  })
  .post('/login', function(req, res) {
    co(function * () {
      const db = yield client.connect(uri, { useNewUrlParser: true })
      const arr = yield find(db, 'users')
      for (var i = 0; i <arr.length; i++) {
        if (arr[i].user === req.body.user && arr[i].password === req.body.password) {
          res.end(JSON.stringify([{"success": "success"}]))
          return
        }
      }
      res.end(JSON.stringify([{"success": "error"}]))
    }).catch(err => console.log(err))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  /* async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir); */
  