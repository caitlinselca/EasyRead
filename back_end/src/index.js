require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const userRoute = require('./routes/user');

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

app.use('/user', userRoute);
 
app.listen(3001, () =>
  console.log('Example app listening on port 3001!'),
);


