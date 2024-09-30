'use strict'

const mongoose = require('mongoose');
const config = require('../configs/config.mongodb');

const { host, port, name } = config.db;
const connectString = `mongodb://${host}:${port}/${name}`;
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
