import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy } from 'passport-google-oauth20';
const googleRouter = express.Router();
dotenv.config();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};
const AUTH_OPTIONS = {
    callbackURL: '/api/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log({ profile });
    done(null, profile);
}
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
googleRouter.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));
googleRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/success',
    session: false,
}));
export { googleRouter };
