import express from 'express';
import passport from 'passport';
import { isAuthenticated } from './googleAuth.controller.js';
import { config } from '../../config.js';
const googleRouter = express.Router();
// Redirect user to the google auth/login page
googleRouter.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));
// Handle response from Google and authenticate the user
const REDIRECT_URI = config.GOOGLE_REDIRECT_URI || '/google/callback';
console.log('Redirect URI: ', REDIRECT_URI);
googleRouter.get(REDIRECT_URI, passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
    session: true,
}));
googleRouter.get('/authenticated', isAuthenticated);
googleRouter.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
});
export { googleRouter };
