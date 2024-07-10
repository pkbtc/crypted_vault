import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB=async()=>{
    try {
        return mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB