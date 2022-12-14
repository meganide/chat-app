import mysql from 'mysql2';
import crypto from 'crypto';

import { db } from '../services/database.js';
import { cloudinaryV2 } from '../services/cloudinary.js';
import { verifyPassword } from '../routes/googleAuth/googleAuth.controller.js';

interface iValues {
  profilePic?: any;
  displayName?: string;
  bio?: string;
}

function getUserProfile(displayName: string) {
  const q = `
  SELECT profilePic, bio, timeCreated FROM users WHERE displayName = ${mysql.escape(displayName)}
  `;

  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(results);
    });
  });
}

function editProfile(userId: string, values: iValues) {
  let promises = [];

  for (const property in values) {
    if (values[property as keyof iValues]) {
      const editProfilePromise = updateUserProfile(property, values, userId);
      promises.push(editProfilePromise);
    }
  }

  return promises;
}

function checkIfNameExists(property: string, values: iValues) {
  if (property === 'displayName') {
    const findUserWithName = `SELECT displayName FROM users WHERE displayName = ${mysql.escape(
      values[property as keyof iValues]
    )}`;

    return new Promise((resolve, reject) => {
      db.query(findUserWithName, (err, results) => {
        if (err) {
          console.log(err);
          reject('Failed to change username!');
        }

        const userWithName: any = results;
        if (userWithName.length === 0) {
          resolve('Username available!');
        } else if (userWithName.length > 0) {
          reject('Username already exists!');
        }
      });
    });
  }
}

async function updateUserProfile(property: string, values: iValues, userId: string) {
  await checkIfNameExists(property, values);

  const updateUserProfile = `UPDATE users SET ${property} = ${mysql.escape(
    values[property as keyof iValues]
  )} WHERE userId = ${mysql.escape(userId)}`;

  return new Promise((resolve, reject) => {
    db.query(updateUserProfile, (err, results) => {
      if (err) {
        reject('Failed to edit profile!');
      }
      resolve('Successfully edited profile!');
    });
  });
}

async function uploadImageToCloudinary(userId: string, fileStr: string) {
  try {
    const uploadedResponse = await cloudinaryV2.uploader.upload(fileStr, {
      upload_preset: 'profile',
      folder: 'users/' + userId + '/profile',
      overwrite: true,
      public_id: 'profile_pic',
    });
    console.log(uploadedResponse);
    return uploadedResponse;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
}

function findUser(email: string, password: string, done: any) {
  const q = `
  SELECT * FROM users WHERE email = ${mysql.escape(email)}
  `;

  return db.query(q, async (err, results: any) => {
    if (err) {
      return done(err);
    }
    if (!results.length) {
      console.log('didnt find any users');
      return done(null, false);
    }

    const isMatched = await verifyPassword(password, results[0].password);

    if (!isMatched) {
      console.log('pw doesnt match');
      return done(null, false);
    }
    console.log('results[0] in findUser', results[0]);
    return done(null, results[0]);
  });
}

function register(req: any, res: any, user: any) {
  const q = `
  SELECT * FROM users WHERE email = ? OR displayName = ?
  `;
  const values = [user.email, user.displayName];

  db.query(q, values, (err, results: any) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    if (results.length > 0) {
      return res.sendStatus(400);
    }

    const insertQ = `
    INSERT IGNORE INTO users (userId, displayName, email, password, profilePic, provider) VALUES (?)
    `;
    const userId = generateRandomNumberString(25);
    const insertValues = [
      userId,
      user?.displayName,
      user?.email,
      user?.password,
      'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      'local',
    ];

    return db.query(insertQ, [insertValues], (insertErr, insertResults) => {
      if (insertErr) {
        console.log(insertErr);
        return res.sendStatus(500);
      }

      return req.login(user, function (err: any) {
        console.log('user from reqlogin', user);
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        res.redirect('/');
      });
    });
  });
}

function generateRandomNumberString(length: number) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += crypto.randomBytes(1).readUInt8(0) % 10;
  }
  return result;
}

function getUserId(email: string) {
  const q = `
  SELECT userId FROM users WHERE email = ${mysql.escape(email)};
  `;

  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });
  });
}

export { editProfile, uploadImageToCloudinary, getUserProfile, findUser, register, getUserId };
