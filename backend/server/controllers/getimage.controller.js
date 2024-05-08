const {ethers} =require('ethers');
const UserModel=require('../models/User');
const {PINATA_API,PINATA_SECRET_KEY}=require('../config/serverConfig');
const { decryptData }=require("../utils/decryption");
async function getimageController(req,res,next){
    try {
        
       const address=req.address;
       const userAddress=address.toLowerCase();
       const {page,limit}=req.query;
       console.log(page,limit)
       const pageNumber =parseInt(page) || 1;
       const limitNumber = pasrseInt(limit) || 1;
       if(pageNumber<1 || limitNumber<1){
        throw new Error("pagination error");
       }
       const startIndex=(pageNumber-1)*limitNumber;
       const endIndex=pageNumber*limitNumber;
       const ifpfsArray= req.body.slice(startIndex,Math.min(req.body.length,endIndex));
       console.log(ifpfsArray);
       
       const user=await UserModel.findOne({userAddress:userAddress});
       if(!user){
        throw new Error("user not found");
       }


        res.status(200).json({message:"image sent sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({messgae:"internal server error"});
    }
}
module.exports={getimageController};