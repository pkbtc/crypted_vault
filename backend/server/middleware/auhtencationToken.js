import jwt from "jsonwebtoken";
export const authencationToken=async(req,res,next)=>{
   try {
    const token = req.headers['x-access-token'];
    if(!token){
        throw new Error("token not found");
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.address=decode.userAddress;
    next();
   } catch (error) {
    res.status(404).json({message:"internal server error"});
    console.log(error)
   }
}