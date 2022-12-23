import express from 'express';
import { updateProfile } from './user.controller.js';
const userRouter = express.Router();
userRouter.put('/profile/:userId', updateProfile);
export { userRouter };
