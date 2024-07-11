import express from 'express';
import router from './routes/authencation.js';
import cors from 'cors';
import connectDB from './db/Connect.js';
import imageRoute from './routes/uploadImage.js';
import getRouter from './routes/getImage.js';

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api',router);
app.use('/api',imageRoute);
app.use('/api',getRouter);
const port=process.env.PORT || 8080;
await connectDB()
        .then(()=>{
            app.listen(port,()=>{
                console.log("server is running on port 3000")
            })
        })
        .catch((error)=>{
            console.log(error);
        }
    )