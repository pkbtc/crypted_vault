import {ethers} from "ethers"
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const auth=async(req,res,next)=>{
    try {
        const {signature}=req.body;
        const {address}=req.query;
        console.log(address);
        const recoveredAccount=ethers.utils.verifyMessage("welcome to crypted Vault",signature);

        if(!signature){
            throw new Error("signature not found");
        }
        if(address.toLowerCase()===recoveredAccount.toLowerCase()){
            const userAddress = recoveredAccount.toLowerCase();
            let user = await User.findOne({ userAddress });

            if (!user) {
                user = await User.create({ userAddress });
                console.log(user);
            }
            const token=jwt.sign({userAddress},process.env.JWT_SECRET);
            res.status(200).json({message:"success",token});
        }
        else{
            res.status(404).json({message:"invalid signature"});
        }
        
        console.log(recoveredAccount);
    } catch (error) {
        res.status(404).json({message:"internal server error"});
    }
}

export default auth