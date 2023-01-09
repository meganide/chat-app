import express from 'express';

import { httpGetUserProfile, httpUploadImage, updateProfile } from './user.controller.js';

const userRouter = express.Router();

userRouter.get('/profile/:displayName', httpGetUserProfile)
userRouter.put('/profile/:userId', updateProfile);
userRouter.post('/profile/upload/:userId', httpUploadImage)

export { userRouter };
