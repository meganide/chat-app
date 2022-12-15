import express from 'express';
import passport from 'passport';
import { isAuthenticated } from './googleAuth.controller.js';

const googleRouter = express.Router();

// Redirect user to the google auth/login page
googleRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// Handle response from Google and authenticate the user
googleRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
    session: true,
  })
);

googleRouter.get('/authenticated', isAuthenticated);

googleRouter.get('/logout', (req: any, res) => {
  req.logout();
  return res.redirect('/login');
});

export { googleRouter };
