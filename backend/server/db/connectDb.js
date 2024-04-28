const mongoose = require('mongoose');

const connectDB=async(url)=>{
    try {
        await mongoose.connect(url)
                .then(()=>{
                    console.log("Db connected sucessfully");
                })
                .catch((error)=>{
                    console.log(error);
                })
    } catch (error) {
        console.log(error)
    }
}
module.exports={connectDB};