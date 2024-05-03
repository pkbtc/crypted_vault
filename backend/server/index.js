const express=require('express');
const app=express();
const {MONGO_URL} =require('./config/serverConfig');
const {connectDB}=require('./db/connectDb');
const cors=require('cors');
app.use(cors());
app.use(express.json());
const authentication=require('./routes/auth.routes');
const uplaodImageRoute=require('./routes/upload.routes');
const getImageRoutes=require('./routes/getImage.routes');

app.use('/api',authentication);
app.use('/api',uplaodImageRoute);
app.use('/api',getImageRoutes);

async function serverStart(){
    try {
        
        app.listen(3000,()=>{
            console.log("server is running on port 3000");
        });
      await  connectDB(MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}
serverStart();


