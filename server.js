const express = require('express');
const mongodb = require('mongodb').MongoClient;

const app = express();
const port = 3001;
// connection to local instance of MongoDB
const connectionStringURI = 'mongodb://127.0.0.1:27017/socialnetworkdb';
// declare variable to hold db connection
let db;

mongodb.connect(
    connectionStringURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        db = client.db {
            app.listen(port, () => {
                console.log(`App is listenting on http://localhost:${port}`);
            });
        }
    }
);

app.use(express.json()); 