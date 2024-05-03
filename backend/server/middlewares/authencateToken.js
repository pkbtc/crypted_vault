const jwt=require('jsonwebtoken');
const {JWT_SECRETKEY}=require('../config/serverConfig');
async function authencateToken(req,res,next){
    try {
        const token=req.headers["x-access"];
    if(!token){
        throw new Error("No token found");
    }
    const decode=jwt.verify(token,JWT_SECRETKEY);
    req.address=decode.address;
    next();
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}
module.exports={authencateToken}