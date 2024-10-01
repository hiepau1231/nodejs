'use strict';

class AccessController {
    signUp = async (req, res, next) => {
       try {
        console.log('[P]::signup', req.body);
        if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                code: '40001',
                message: 'Missing required fields'
            });
        }
        //200 is OK , 201 is created
        return res.status(201).json({
            code: '20001',
            message: {userid: 1}
        });
       } catch (error) {
        console.error('Error in signUp:', error);
        next(error);
       }
    }
}

module.exports = new AccessController();
