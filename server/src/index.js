import bodyParser from 'body-parser';
import co from 'co';
import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongo from 'mongodb';

env.config();

const PORT = process.env.PORT || 5001;
const uri = process.env.MONGODB_URI;
const { MongoClient } = mongo;
const dbName = process.env.MONGODB_DB;
// (node:83308) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
let db = null;
// Initialize connection once
MongoClient.connect(uri, (err, database) => {
  if (err) {
    console.log(err);
  }
  db = database.db(dbName);
});

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
    const docs = yield db.collection('users')
      .find({})
      .toArray();
    const reqId = req.body.id.toString().trim();
    const item = docs.find((doc) => doc.id.toString().trim() === reqId);
    if (item) {
      const {
        firstname,
        lastname,
        id,
        profile,
        role,
      } = item;
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
    res.end(JSON.stringify({
      success: false,
    }));
  }).catch(err => console.log(err));
});
app.post('/api/v1/users/update', (req, res) => {
  co(function * () {
    const { body } = req;
    const { data } = body;
    const {
      displayname,
      firstname,
      lastname,
      id,
      profile,
      role,
    } = data;
    const doc = {
      ...(displayname && { displayname }),
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      id,
      ...(profile && { profile }),
      ...(role && { role }),
    };
    db.collection('users').updateOne(
      { id },
      { $set: doc },
      { upsert: true },
      () => {
        co(function * () {
          const docs = yield db.collection('users')
            .find({})
            .toArray();
          res.end(JSON.stringify(docs));
        });
      },
    )
  }).catch(err => console.log(err));
});
app.post('/api/v1/attempts/update', (req, res) => {
  co(function * () {
    const { body } = req;
    const { data } = body;
    data.forEach((doc) => {
      const { brt_id } = doc;
      db.collection('attempts').updateOne(
        { brt_id },
        { $set: doc },
        { upsert: true },
        () => {
          co(function * () {
            const docs = yield db.collection('attempts')
              .find({})
              .toArray();
            res.end(JSON.stringify(docs));
          });
        },
      )
    });
  }).catch(err => console.log(err));
});
app.post('/api/v1/users/delete', (req, res) => {
  co(function * () {
    const { body } = req;
    const { data } = body;
    const { id } = data;
    db.collection('users').deleteOne(
      { id },
    )
      .then(() => {
        co(function * () {
          const docs = yield db.collection('users')
            .find({})
            .toArray();
          res.end(JSON.stringify(docs));
        });
      });
  }).catch(err => console.log(err));
});
app.post('/api/v1/segments/delete', (req, res) => {
  co(function * () {
    const { body } = req;
    const { data } = body;
    const { id } = data;
    db.collection('segments').deleteOne(
      { id },
    )
      .then(() => {
        co(function * () {
          const docs = yield db.collection('segments')
            .find({})
            .toArray();
          res.end(JSON.stringify(docs));
        });
      });
  }).catch(err => console.log(err));
});
app.get('/api/v1/attempts', (req, res) => {
  co(function * () {
    const docs = yield db.collection('attempts')
      .find({})
      .toArray();
    res.end(JSON.stringify(docs));
  }).catch(err => console.log(err))
});
app.get('/api/v1/users', (req, res) => {
  co(function * () {
    const docs = yield db.collection('users')
      .find({})
      .toArray();
    res.end(JSON.stringify(docs));
  }).catch(err => console.log(err))
});
app.get('/api/v1/segments', (req, res) => {
  co(function * () {
    const docs = yield db.collection('segments')
      .find({})
      .toArray();
    res.end(JSON.stringify(docs));
  }).catch(err => console.log(err))
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  