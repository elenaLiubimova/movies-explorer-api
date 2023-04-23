require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
