import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
import User from "../models/User.js";
import { generateEncryptionKey } from "../utils/generateKey.js";
import { encryptFile } from "../utils/encryption.js";
dotenv.config();
const upload=async(req,res,next)=>{
    try {
        const Address=req.address;
        console.log("revoked address",Address);
        const userAddress=Address.toLowerCase();
        let user=await User.findOne({userAddress});
        if(!user){
            throw new Error("user not found");
        }
        if(user.encryptionKey===null){
            const encryptionKey=generateEncryptionKey(32);
            user.encryptionKey=encryptionKey;
            await user.save();
        }
        const { encryptedData, iv }=encryptFile(req.file.buffer, user.encryptionKey);
        console.log(encryptedData);
        
        const pinata = new pinataSDK({ pinataApiKey: process.env.PINTA_API_KEY , pinataSecretApiKey: process.env.PINATA_SECRET });
        const resPinata=await pinata.pinJSONToIPFS({encryptedData,iv});
        console.log(resPinata);

        res.status(200).json({ipfsHash:resPinata.IpfsHash,message:"success"});



    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


export default upload