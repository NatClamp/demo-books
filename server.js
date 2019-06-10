const express = require('express');

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

// add in router etc.

module.exports = app;