'use strict';

const express = require('express');
const router = express.Router();

router.use('/v1/api', require('./access'));

// router.get('', (req, res) => {
//     const strCompress = 'Hello fan Tipjs';
//     res.status(200).json({
//         message: 'Welcome fan Tipjs',
//         // metadata: strCompress.repeat(100000)
//     });
// });


module.exports = router;