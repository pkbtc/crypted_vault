const express=require('express');
const router=express.Router();
const {getimageController}=require('../controllers/getimage.controller');

router.post('/getimage',getimageController);

module.exports=router;
