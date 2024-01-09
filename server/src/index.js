import bodyParser from 'body-parser';
import co from 'co';
import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongo from 'mongodb';

env.config();

const PORT = process.env.PORT || 5001;
const uri = process.env.MONGOLAB_URI;
const { MongoClient } = mongo;
const client  = MongoClient;
// (node:83308) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
let db = null;

// Initialize connection once
client.connect(uri, (err, database) => {
  if (err) {
    // Set up error handling
  }
  db = database;
});

const find = (db, col) => (
  co(function * () {
    const dbo = db.db('brtstravapoints');
    const collection = dbo.collection(col);
    const docs = yield collection.find({}).toArray();
    return docs;
  })
);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api/v1/authenticate', (req, res) => {
  co(function * () {
    const arr = yield find(db, 'users');
    for (var i = 0; i <arr.length; i++) {
      const item = arr[i];
      const itemId = item.id.toString().trim();
      const reqId = req.body.id.toString().trim();
      if (itemId === reqId) {
        res.end(JSON.stringify([{'success': 'success'}]));
        return;
      }
    }
    res.end(JSON.stringify([{'success': 'error'}]));
  }).catch(err => console.log(err));
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  