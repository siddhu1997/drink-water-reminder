const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(router);

module.exports = app;