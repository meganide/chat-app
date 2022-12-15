import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { config } from '../../config.js';
const AUTH_OPTIONS = {
    callbackURL: '/api/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};
function initializeGoogleAuth(app) {
    // Create a new Google OAuth 2 strategy
    passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
    // Save session to cookie
    passport.serializeUser((user, done) => {
        console.log({ user });
        done(null, user.id);
    });
    // Read cookie
    passport.deserializeUser((id, done) => {
        console.log({ id });
        done(null, id);
    });
    // Initialize Passport.js
    app.use(passport.initialize());
    // Use a session-based-authentication strategy
    app.use(passport.session());
}
// Function is called when user is authenticated
function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log({ profile });
    done(null, profile);
}
function getUser(req, res) {
    const userId = req.user;
    return res.status(200).send({ userId });
}
export { initializeGoogleAuth, getUser };
