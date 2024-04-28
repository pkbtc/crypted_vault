const express =require('express');
const router=express.Router();
const {uploadControler}=require('../controllers/uplaod.controller');



router.post('/uploadimage',uploadControler);


module.exports=router;