const express =require('express');
const router=express.Router();
const {uploadControler}=require('../controllers/uplaod.controller');
const {uploadUserImage}=require('../middlewares/multer');
const {authencateToken}=require('../middlewares/authencateToken');


router.post('/uploadimage',authencateToken,uploadUserImage,uploadControler);


module.exports=router;