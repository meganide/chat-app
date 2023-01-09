import mysql from 'mysql2';
import crypto from 'crypto';

import { db } from '../services/database.js';
import { cloudinaryV2 } from '../services/cloudinary.js';

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
  SELECT * FROM users WHERE username = ${mysql.escape(email)}
  `;

  return db.query(q, (err, results: any) => {
    if (err) {
      return done(err);
    }
    if (!results.length) {
      return done(null, false);
    }
    if (results[0].password !== password) {
      return done(null, false);
    }
    console.log('results[0] in findUser', results[0])
    return done(null, results[0]);
  });
}

function register(req: any, res: any, user: any) {
  const q = `
  INSERT IGNORE INTO users (userId, displayName, email, password, profilePic, provider) VALUES (?)
  `;
  const userId = generateRandomNumberString(25);
  const values = [
    userId,
    user?.displayName,
    user?.email,
    user?.password,
    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    'local',
  ];

  return db.query(q, [values], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      req.login(user, function (err: any) {
        if (err) {
          console.log(err);
        }
        console.log('req.user', req.user)
        console.log('redirect')
        return res.redirect('/');
      });
    }
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
  const q = 
  `
  SELECT userId FROM users WHERE email = ${mysql.escape(email)};
  `

  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(results)
    })
  })
}

export { editProfile, uploadImageToCloudinary, getUserProfile, findUser, register, getUserId };
