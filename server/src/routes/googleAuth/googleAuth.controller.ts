import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { config } from '../../config.js';

const AUTH_OPTIONS: any = {
  callbackURL: '/api/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function initializeGoogleAuth(app: any) {
  // Create a new Google OAuth 2 strategy
  passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

  // Save session to cookie
  passport.serializeUser((user: any, done) => {
    console.log({ user });
    done(null, user.id);
  });

  // Read cookie
  passport.deserializeUser((id: string, done) => {
    console.log({ id });
    done(null, id);
  });

  // Initialize Passport.js
  app.use(passport.initialize());

  // Use a session-based-authentication strategy
  app.use(passport.session());
}

// Function is called when user is authenticated
function verifyCallback(accessToken: any, refreshToken: any, profile: any, done: any) {
  console.log({ profile });
  done(null, profile);
}

function getUser(req: any, res: any) {
  const userId = req.user
  return res.status(200).send({userId})
}

export { initializeGoogleAuth, getUser };
