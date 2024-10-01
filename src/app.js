require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');


//init middleware
app.use(morgan('dev'))
app.use(helmet());
app.use(compression());

//init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

//init routes
app.use('/', require('./routes'));

module.exports = app; 