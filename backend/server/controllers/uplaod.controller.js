const {ethers} =require('ethers');
const UserModel=require('../models/User');
const {PINATA_API,PINATA_SECRET_KEY}=require('../config/serverConfig');
const {generateEncryptionKey}=require('../utils/generateKey');
const {encryptFile}=require('../utils/encryption');
async function uploadControler(req,res,next){
    try {
       const address=req.address;
       const userAddress=address.toLowerCase();
       const user=await UserModel.findOne({userAddress:userAddress});
       if(!user){
        throw new Error("user not found");
       }
       if(user.encryptionKey===null){
        const encryptionKey=await generateEncryptionKey(32);
        user.encryptionKey=encryptionKey;
        user.save();
       }
       const {encryptedData,iv} = encryptFile(req.file.buffer,user.encryptionKey);
       console.log(encryptedData);
       const pinataSDK = require('@pinata/sdk');
       const pinata = new pinataSDK({ pinataApiKey: "11f2ced7d72e48661400", pinataSecretApiKey: "242e41db58912b76e17ea13ac2d394e3cdf757937292357c1fca6576e2b1e2f6" });
       const resPinata=await pinata.pinJSONToIPFS({
           encryptedData,iv
       });
       

       res.status(200).json({ipfsHash:resPinata.IpfsHash,message:"upload sucessfull"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}
module.exports={uploadControler}