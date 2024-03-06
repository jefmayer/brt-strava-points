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
const dbName = 'brtstravapoints';
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
    const dbo = db.db(dbName);
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
  if (req.body.id === '') {
    res.end(JSON.stringify({
      success: false,
    }));
  }
  co(function * () {
    const docs = yield find(db, 'users');
    for (var i = 0; i <docs.length; i++) {
      const item = docs[i];
      const {
        firstname,
        lastname,
        id,
        profile,
        role,
      } = item;
      const reqId = req.body.id.toString().trim();
      if (id.toString().trim() === reqId) {
        res.end(JSON.stringify({
          firstname,
          lastname,
          id,
          profile,
          role,
          success: true,
        }));
        return;
      }
    }
    res.end(JSON.stringify({
      success: false,
    }));
  }).catch(err => console.log(err));
});
app.post('/api/v1/users/update', (req, res) => {
  co(function * () {
    const dbo = db.db(dbName);
    const { body } = req;
    const { data } = body;
    const {
      firstname,
      lastname,
      id,
      profile,
    } = data;
    const doc = {
      firstname,
      lastname,
      id,
      profile,
    };
    dbo.collection('users').updateOne(
      { id },
      { $set: doc },
      { upsert: true }
    )
    const docs = yield find(db, 'users')
    res.end(JSON.stringify(docs));
  }).catch(err => console.log(err));
});
app.get('/api/v1/users', (req, res) => {
  co(function * () {
    const docs = yield find(db, 'users');
    res.end(JSON.stringify(docs));
  }).catch(err => console.log(err))
});
app.get('/api/v1/segments', (req, res) => {
  co(function * () {
    const docs = yield find(db, 'segments');
    res.end(JSON.stringify(docs));
  }).catch(err => console.log(err))
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  