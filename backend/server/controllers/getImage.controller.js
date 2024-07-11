import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
import User from "../models/User.js";
import { generateEncryptionKey } from "../utils/generateKey.js";
import { encryptFile } from "../utils/encryption.js";
import { decryptData } from "../utils/decryption.js";
import axios from "axios";
dotenv.config();
const PINATA_GATEWAY_URL="https://gateway.pinata.cloud/ipfs/"

const returnIpfsRes=async(ipfsHash)=>{
    const res =await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`);
    return res.data; 
}
const get=async(req,res)=>{
        try {
        const Address=req.address;
        const userAddress=Address.toLowerCase();
        let user=await User.findOne({userAddress});
        if(!user){
            throw new Error("user not found");
        }

        const {page,limit}=req.query;
        const pageNumber=parseInt(page)|| 1;
        const limitNumber=parseInt(limit)|| 1;
        if(pageNumber<1 || limitNumber<1){
            throw new Error("invalid page number or limit number");
        }
        const startIndex=(pageNumber-1)*limitNumber;
        const endIndex=pageNumber*limitNumber;
        const ipfsHashesArray=req.body.slice(startIndex,Math.min(endIndex,req.body.length));
        const decryptedDataArray=[];

        if(ipfsHashesArray.length!==0){
            const encryptedData=await Promise.all(ipfsHashesArray.map(async(ipfsHash)=>{
                const res=await returnIpfsRes(ipfsHash);
                return res;
            }));
            
            for(const img of encryptedData){
                const decryptedImgData=decryptData(img.encryptedData,img.iv,user.encryptionKey);
                decryptedDataArray.push(decryptedImgData.toString('base64'));
            }

        }
        

        res.status(200).json({message:"Image sent",decryptedDataArray});
        } catch (error) {
            console.log(error);
        }
}

export default get