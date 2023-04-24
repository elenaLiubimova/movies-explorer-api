require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./rateLimiter');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(helmet());
app.use(express.json());
app.use(limiter);

app.use(routes);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
