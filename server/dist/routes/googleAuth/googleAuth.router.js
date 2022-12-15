import express from 'express';
import passport from 'passport';
import { getUser } from './googleAuth.controller.js';
const googleRouter = express.Router();
// Redirect user to the google auth/login page
googleRouter.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));
// Handle response from Google and authenticate the user
googleRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
    session: true,
}));
googleRouter.get('/getUser', getUser);
export { googleRouter };
