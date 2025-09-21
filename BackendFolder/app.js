const express = require('express');
const app = express();

const namRouter = require('./Routes/namRouter');

app.use(express.json());

app.use('/api/v1/namaste',namRouter);

module.exports = app;