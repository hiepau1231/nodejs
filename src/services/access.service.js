'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('../services/keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const RoleShop = {
    SHOP: 'shop',
    WRITER: 'writer',
    EDITOR: 'editor',
    ADMIN: 'admin',
    SYSTEM: 'system'
}

module.exports = class AccessService {
    static signUp = async (name, email, password) => {
        try {
            // Kiểm tra các tham số đầu vào
            if (!name || !email || !password) {
                throw new Error('Missing required fields');
            }

            // Kiểm tra email đã tồn tại
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered'
                }
            }

            // Kiểm tra và mã hóa mật khẩu
            if (!password || typeof password !== 'string') {
                throw new Error('Invalid password');
            }
            const hashPassword = await bcrypt.hash(password, 10);

            // Tạo shop mới
            const newShop = await shopModel.create({
                name,
                email,
                password: hashPassword,
                roles: [RoleShop.SHOP]
            });

            if (newShop) {
                // Tạo privateKey và publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
                console.log('Generated keys:', { publicKey, privateKey });

                // Lưu public key và private key
                console.log('Calling KeyTokenService.createKeyToken...');
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });
                console.log('KeyStore created:', keyStore);

                if (!keyStore) {
                    throw new Error('Error creating key store');
                }

                // Tạo token pair
                console.log('Creating token pair...');
                const tokens = await createTokenPair({
                    userId: newShop._id,
                    email,
                    roles: newShop.roles
                }, publicKey, privateKey);

                console.log('Created token pair:', tokens);

                return {
                    code: '201',
                    message: 'Shop created successfully',
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                };
            }

            throw new Error('Could not create shop');

        } catch (error) {
            console.error('Error in AccessService.signUp:', error);
            return {
                code: 'xxxx',
                message: error.message || 'An error occurred during sign up',
                status: 'error'
            };
        }
    }
    // Other methods of AccessService class can be added here
}
