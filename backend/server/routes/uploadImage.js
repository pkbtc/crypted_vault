import express from 'express';
import { Router } from 'express';
import upload from '../controllers/upload.controller.js';
import { uploadUserImage } from '../middleware/multer.js';
import { authencationToken } from '../middleware/auhtencationToken.js';

const imageRoute=Router();

imageRoute.post('/upload',authencationToken,uploadUserImage,upload);

export default imageRoute