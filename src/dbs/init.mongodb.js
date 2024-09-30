'use strict'

const mongoose = require('mongoose');
// Remove this line as it's causing an error
// const { countConnect } = require('../helpers/check.connect');
const connectString = 'mongodb://127.0.0.1:27017/shopDev?retryWrites=true&w=majority';
const { countConnect } = require('../helpers/check.connect');

class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50
        })
            .then(_ => console.log('Connected Mongodb Success Pro', countConnect()))
            .catch(err => console.log('Error Connect!', err.message));
    }
}

Database.getInstance = () => {
    if (!Database.instance) {
        Database.instance = new Database();
    }
    return Database.instance;
}

const instanceMondb = Database.getInstance();
module.exports = instanceMondb;
