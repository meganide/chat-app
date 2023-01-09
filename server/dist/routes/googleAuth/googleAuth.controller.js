import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from "bcrypt";
import { config } from '../../config.js';
import { addUserToDb, findUserWithGoogleId } from '../../models/googleAuth.model.js';
import { findUser, getUserId, register } from '../../models/user.model.js';
const AUTH_OPTIONS = {
    callbackURL: config.GOOGLE_REDIRECT_URI || '/api/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};
const LOCAL_OPTIONS = {
    usernameField: 'email',
};
function initializeGoogleAuth(app) {
    // Create a new Google OAuth 2 strategy
    passport.use(new PassportLocal.Strategy(LOCAL_OPTIONS, async (email, password, done) => {
        try {
            findUser(email, password, done);
        }
        catch (error) {
            done(error);
        }
    }));
    passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
    // Save session to cookie
    passport.serializeUser(async (user, done) => {
        console.log('user', user);
        if (user.password) {
            const userId = await httpGetUserId(user?.email);
            if (userId[0].userId) {
                done(null, userId[0].userId);
            }
        }
        else {
            done(null, user.id);
        }
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
async function httpRegister(req, res) {
    const hashedPassword = await hashPassword(req.body.password);
    const user = {
        email: req.body.email,
        displayName: req.body.displayName,
        password: hashedPassword,
    };
    register(req, res, user);
}
async function httpGetUserId(email) {
    const userId = await getUserId(email);
    return userId;
}
function httpLogin(req, res) {
    if (req.user && req.isAuthenticated()) {
        return res.status(200).json({ message: 'success' });
    }
    else {
        return res.status(400).json({ message: 'fail' });
    }
}
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
export { initializeGoogleAuth, isAuthenticated, httpRegister, httpLogin, hashPassword, verifyPassword };
