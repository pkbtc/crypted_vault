const {ethers} =require('ethers');
const UserModel=require('../models/User');
const {PINATA_API,PINATA_SECRET_KEY}=require('../config/serverConfig');
const {generateEncryptionKey}=require('../utils/generateKey');
const {encryptFile}=require('../utils/encryption');
async function getimageController(req,res,next){
    try {
        


        res.status(200).json({message:"image sent sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({messgae:"internal server error"});
    }
}
module.exports={getimageController};