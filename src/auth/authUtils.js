'use strict'
const jwt = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //access token
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });
        //refresh token
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('error verify::', err);
            } else {
                console.log('decode verify::', decode);
            }
        });
        
        return {accessToken, refreshToken};
    } catch (error) {
        return {
            code: 'xxx',
            message: error.message,
            status: 'error'
        }
    }
}

module.exports = {
    createTokenPair
}

