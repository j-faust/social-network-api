const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const port = 3001;

app.use(express.json()); 
app.use(routes);
app.use(express.urlencoded({  extended: true }));


db.once('open', () => {
    app.listen(port, () => {
        console.log(`Now listening at http://localhost:${port}`);
    });
});