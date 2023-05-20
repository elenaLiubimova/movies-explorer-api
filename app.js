require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB } = require('./config');

const { NODE_ENV, DB_PRODUCTION } = process.env;

const dbUrl = NODE_ENV === 'production' ? DB_PRODUCTION : DB;

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
mongoose.connect(dbUrl);
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(requestLogger);

app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(handleErrors);

app.listen(PORT);
