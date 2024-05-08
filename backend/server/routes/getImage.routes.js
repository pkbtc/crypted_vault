const express=require('express');
const router=express.Router();
const {getimageController}=require('../controllers/getimage.controller');
const {authencateToken}=require('../middlewares/authencateToken');

router.post('/getimage',authencateToken,getimageController);

module.exports=router;
