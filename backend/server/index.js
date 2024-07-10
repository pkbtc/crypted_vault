import express from 'express';
import router from './routes/authencation.js';
import cors from 'cors';
import connectDB from './db/Connect.js';

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api',router);

await connectDB()
        .then(()=>{
            app.listen(3000,()=>{
                console.log("server is running on port 3000")
            })
        })
        .catch((error)=>{
            console.log(error);
        }
    )