import mysql from 'mysql2';

import { db } from '../services/database.js';

export interface iFindUser {
  id: number;
  userId: string;
  displayName: string;
  profilePic: string | undefined;
  provider: string;
  email: string;
  emailVerified: boolean;
}

function findUserWithGoogleId(userId: string): Promise<iFindUser[] | []> {
  const findUser = `SELECT * FROM users WHERE userId = ${mysql.escape(userId)}`;

  return new Promise((resolve, reject) => {
    db.query(findUser, (err, results: iFindUser[] | []) => {
      if (err) throw err;

      resolve(results);
    });
  });
}

function addUserToDb(profile: any) {
  const q =
    'INSERT INTO users (`userId`, `displayName`, `profilePic`, `provider`, `email`, `emailVerified`) VALUES (?)';
  const userId: string = profile.id;
  const displayName: string = profile.displayName;
  const profilePic: string = profile._json.picture;
  const provider: string = profile.provider;
  const email: string = profile._json.email;
  const emailVerified: boolean = profile._json.email_verified;
  const values = [userId, displayName, profilePic, provider, email, emailVerified];

  db.query(q, [values], (err, data) => {
    if (err) throw err;
    return { data, message: 'Successfully added new user to DB!' };
  });
}

export { findUserWithGoogleId, addUserToDb };
