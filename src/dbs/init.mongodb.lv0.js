'use strict'

const mongoose = require('mongoose');

const connectString = 'mongodb://127.0.0.1:27017/shopDev?retryWrites=true&w=majority';

mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(_ => console.log('Connected Mongodb Success'))
    .catch(err => console.log('Error Connect!', err.message));

// Set debug mode
mongoose.set('debug', true);

module.exports = mongoose;
