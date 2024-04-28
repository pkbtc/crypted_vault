const express =require('express');
const router=express.Router();
const {uploadControler}=require('../controllers/uplaod.controller');
const {uploadUserImage}=require('../middlewares/multer');


router.post('/uploadimage',uploadUserImage,uploadControler);


module.exports=router;