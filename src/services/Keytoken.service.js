'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey
    }) => {
        try {
            console.log('Creating key token for user:', userId);
            console.log('Public key type:', typeof publicKey);
            console.log('Private key type:', typeof privateKey);

            // Chuyển đổi key thành chuỗi nếu chúng không phải là chuỗi
            const publicKeyString = typeof publicKey === 'string' ? publicKey : publicKey.toString();
            const privateKeyString = typeof privateKey === 'string' ? privateKey : privateKey.toString();

            console.log('Public key string length:', publicKeyString.length);
            console.log('Private key string length:', privateKeyString.length);

            const tokens = await keytokenModel.create({ 
                user: userId,
                publicKey: publicKeyString,
                privateKey: privateKeyString
            });

            console.log('Created tokens:', tokens);

            if (!tokens) {
                throw new Error('Error creating key token');
            }

            return tokens;
        } catch (error) {
            console.error('Error in createKeyToken:', error);
            throw error;
        }
    }
}   

module.exports = KeyTokenService;
