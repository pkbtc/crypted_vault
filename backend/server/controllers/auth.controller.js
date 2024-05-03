const ethers=require('ethers');
const UserModel=require('../models/User');
const jwt=require('jsonwebtoken');
const {JWT_SECRETKEY}=require('../config/serverConfig');
async function authController(req,res,next){
    try {
        const {signature}=req.body;
        const {address}=req.query;
    if(!signature){
        throw new Error("signature is invalid");
    }
    const recoveredAddress=ethers.utils.verifyMessage("welcome to cyrpto vault website",signature);
    console.log(recoveredAddress);
    if(address.toLowerCase()===recoveredAddress.toLowerCase()){
        const address=recoveredAddress.toLowerCase();
        const user=await UserModel.findOne({userAddress:address});
        const token=jwt.sign({
            address
        },JWT_SECRETKEY);
        if(!user){
            const userData=await UserModel.create({userAddress:address});
            console.log(userData);
        }
        res.status(200).json({message:"authencation sucessfull",token});
    }
    else{
        res.status(500).json({message:"authencation failed"});
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"});
    }   
};


module.exports={authController};