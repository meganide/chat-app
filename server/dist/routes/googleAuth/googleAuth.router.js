import express from 'express';
import passport from 'passport';
import { findUserWithGoogleId } from '../../models/googleAuth.model.js';
import { httpLogin, httpRegister, isAuthenticated } from './googleAuth.controller.js';
const googleRouter = express.Router();
// Redirect user to the google auth/login page
googleRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));
// Handle response from Google and authenticate the user
googleRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
    session: true,
}));
googleRouter.get('/google/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userData = await findUserWithGoogleId(userId);
    if (!userData) {
        return res.status(401).json({
            error: 'Unauthorized!',
        });
    }
    return res.status(200).json(userData);
});
googleRouter.get('/authenticated', isAuthenticated);
googleRouter.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
});
// email register
googleRouter.post('/register', httpRegister);
googleRouter.post('/login', passport.authenticate('local'), httpLogin);
export { googleRouter };
