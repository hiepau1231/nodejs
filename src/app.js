const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

//init middleware
app.use(morgan('dev'))
app.use(helmet());
app.use(compression());

//init routes
app.get('/', (req, res) => {
    const strCompress = 'Hello fan Tipjs';
    res.status(200).json({
        message: 'Welcome fan Tipjs',
        metadata: strCompress.repeat(100000)
    });
});

module.exports = app; 