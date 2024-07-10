import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema=new Schema({
    userAddress:{
        type:String,
        required:true
    },
    encryptionKey:{
        type:Buffer,
        default:null
    }
},{
    timestamps:true});


const User=mongoose.model("User",userSchema);
export default User;