import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { config } from '../../config.js';
import { addUserToDb, findUserWithGoogleId } from '../../models/googleAuth/googleAuth.model.js';
const AUTH_OPTIONS = {
    callbackURL: config.GOOGLE_REDIRECT_URI || '/api/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};
function initializeGoogleAuth(app) {
    // Create a new Google OAuth 2 strategy
    passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
    // Save session to cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // Read cookie
    passport.deserializeUser((id, done) => {
        done(null, id);
    });
    // Initialize Passport.js
    app.use(passport.initialize());
    // Use a session-based-authentication strategy
    app.use(passport.session());
}
// Function is called when user is authenticated
async function verifyCallback(accessToken, refreshToken, profile, done) {
    // TODO: Upload profile to DB if user does not exist on DB already
    // TODO: Create an api endpoint to getUserProfile
    // TODO: Fetch userinfo from frontend and display
    const userId = profile.id;
    const findUser = await findUserWithGoogleId(userId);
    if (findUser.length === 0) {
        console.log('trying to add user!', profile);
        addUserToDb(profile);
    }
    done(null, profile);
}
function isAuthenticated(req, res) {
    const isAuthenticated = req.isAuthenticated();
    const userId = req.user;
    console.log('userid from isauth is: ', userId);
    return res.status(200).json({ isAuthenticated, userId });
}
export { initializeGoogleAuth, isAuthenticated };
