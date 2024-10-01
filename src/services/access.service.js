'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RoleShop = {
    SHOP: 'shop',
    WRITER: 'writer',
    EDITOR: 'editor',
    ADMIN: 'admin',
    SYSTEM: 'system'
}
class AccessService {
    static signUp = async (name, email, password) => {
     try {
        //steo : check email is exist
        const hoderShop = await shopModel.findOne({
            email}).lean();
        if (hoderShop) {
            return {
                code: 'xxxx',
                message: 'Shop already registered'
            }
        }
        //step : create new shop
        const hashPassword = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({
            name,
            email,
            password: hashPassword,
            roles: RoleShop.SHOP
        });
        if (newShop) {
            //create privatekey , publickey
            const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
            });
           console.log(publicKey, privateKey); //save collection key store
           
        }
     } catch (error) {
        return{
            code: 'xxx',
            message: error.message,
            status: 'error'
        }
     }
    }
}

module.exports =  AccessService();
