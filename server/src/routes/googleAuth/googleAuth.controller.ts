import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';

import { config } from '../../config.js';
import { addUserToDb, findUserWithGoogleId, iFindUser } from '../../models/googleAuth.model.js';

const AUTH_OPTIONS: any = {
  callbackURL: config.GOOGLE_REDIRECT_URI || '/api/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function initializeGoogleAuth(app: any) {
  // Create a new Google OAuth 2 strategy
  passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

  // Save session to cookie
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Read cookie
  passport.deserializeUser((id: string, done) => {
    done(null, id);
  });

  // Initialize Passport.js
  app.use(passport.initialize());

  // Use a session-based-authentication strategy
  app.use(passport.session());
}



// Function is called when user is authenticated
async function verifyCallback(accessToken: any, refreshToken: any, profile: any, done: any) {
  const userId: string = profile.id;
  const findUser: iFindUser[] | [] = await findUserWithGoogleId(userId);
  if (findUser.length === 0) {
    console.log('trying to add user!', profile);
    addUserToDb(profile);
  }

  done(null, profile);
}

function isAuthenticated(req: any, res: any) {
  const isAuthenticated = req.isAuthenticated();
  const userId = req.user
  console.log('userid from isauth is: ', userId)
  return res.status(200).json({ isAuthenticated, userId });
}

export { initializeGoogleAuth, isAuthenticated };
