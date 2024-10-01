'use strict';

const AccessService = require('../services/access.service');

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
            
            const { name, email, password } = req.body;
            const result = await AccessService.signUp(name, email, password);
            
            if (result.code === '201') {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error('Error in SignUp:', error);
            return res.status(500).json({
                code: 'xxxx',
                message: 'Internal Server Error',
                status: 'error'
            });
        }
    }
}

module.exports = new AccessController();
