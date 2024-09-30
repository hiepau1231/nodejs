'use strict';

//lv01

// const config = {
//     app: {
//         port: process.env.PORT || 3056
//     },
//     db: {
//         host: process.env.MONGO_DB_HOST || '127.0.0.1',
//         port: process.env.MONGO_DB_PORT || 27017,
//         name: process.env.MONGO_DB_NAME || 'shopDev'
//     }
// }

//lv01
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3056
    },
    db: {
        host: process.env.DEV_MONGO_DB_HOST || '127.0.0.1',
        port: process.env.DEV_MONGO_DB_PORT || 27017,
        name: process.env.DEV_MONGO_DB_NAME || 'db_dev'
    }
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3056
    },
    db: {
        host: process.env.PRO_MONGO_DB_HOST || '127.0.0.1',
        port: process.env.PRO_MONGO_DB_PORT || 27017,
        name: process.env.PRO_MONGO_DB_NAME || 'db_pro'
    }
}
const config = {dev, pro};
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
