import express from 'express';
import { Router } from 'express';
import get from '../controllers/getImage.controller.js';
import { authencationToken } from '../middleware/auhtencationToken.js';

const getRouter=Router();

getRouter.post('/getimage',authencationToken,get);

export default getRouter;