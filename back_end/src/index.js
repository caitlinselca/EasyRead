require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const userRoute = require('./routes/user');
const openLibrary = require('./routes/open_library');
const testingGoodReads = require('./routes/good_reads_test');

const app = express();

// Connect to DB
mongoose.connect(process.env.TEST_CLUSTER_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }, () => {
    console.log("Connected to db");
  }
);

// Body parser
app.use(express.json());
app.use(cors());

// Whenever REST api is called, '/user' refers to userRoute, look it up later !!! only change to this file besides line 4
app.use('/user', userRoute);
app.use('/openlibrary', openLibrary);
app.use('/testgoodreads', testingGoodReads);
 
app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);


