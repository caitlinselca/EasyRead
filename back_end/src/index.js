require("dotenv/config");

const express = require('express');
 
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.TEST_CLUSTER_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, () => {
        console.log("connected to db");
      }
    );

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
 
app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);


