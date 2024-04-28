const {ethers} =require('ethers');
const UserModel=require('../models/User');
const {PINATA_API,PINATA_SECRET_KEY}=require('../config/serverConfig');
async function uploadControler(){
    try {
       
       const pinataSDK = require('@pinata/sdk');
       const pinata = new pinataSDK({ pinataApiKey: "11f2ced7d72e48661400", pinataSecretApiKey: "242e41db58912b76e17ea13ac2d394e3cdf757937292357c1fca6576e2b1e2f6" });
       


    } catch (error) {
        console.log(error)
    }
}
module.exports={uploadControler}