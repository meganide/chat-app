import express from 'express';
import { httpUploadImage, updateProfile } from './user.controller.js';
const userRouter = express.Router();
userRouter.put('/profile/:userId', updateProfile);
userRouter.post('/profile/upload/:userId', httpUploadImage);
export { userRouter };
