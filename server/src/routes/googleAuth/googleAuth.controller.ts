import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import * as PassportLocal from 'passport-local';
import bcrypt from "bcrypt"

import { config } from '../../config.js';
import { addUserToDb, findUserWithGoogleId, iFindUser } from '../../models/googleAuth.model.js';
import { findUser, getUserId, register } from '../../models/user.model.js';

const AUTH_OPTIONS: any = {
  callbackURL: config.GOOGLE_REDIRECT_URI || '/api/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const LOCAL_OPTIONS = {
  usernameField: 'email',
};

function initializeGoogleAuth(app: any) {
  // Create a new Google OAuth 2 strategy
  passport.use(
    new PassportLocal.Strategy(LOCAL_OPTIONS, async (email, password, done) => {
      try {
        findUser(email, password, done);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

  // Save session to cookie
  passport.serializeUser(async (user: any, done) => {
    console.log('user', user);
    if (user.password) {
      const userId: any = await httpGetUserId(user?.email);
      if (userId[0].userId) {
        done(null, userId[0].userId);
      }
    } else {
      done(null, user.id);
    }
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
  const userId = req.user;
  
  console.log('userid from isauth is: ', userId);
  return res.status(200).json({ isAuthenticated, userId });
}

async function httpRegister(req: any, res: any) {
  const hashedPassword = await hashPassword(req.body.password)
  const user = {
    email: req.body.email,
    displayName: req.body.displayName,
    password: hashedPassword,
  };

  register(req, res, user);
}

async function httpGetUserId(email: string) {
  const userId = await getUserId(email);
  return userId;
}

function httpLogin(req: any, res: any) {
  if(req.user && req.isAuthenticated()) {
    return res.status(200).json({message: 'success'})
  } else {
    return res.status(400).json({message: 'fail'})
  }
}

async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export { initializeGoogleAuth, isAuthenticated, httpRegister, httpLogin, hashPassword , verifyPassword};
