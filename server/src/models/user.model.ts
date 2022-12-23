import { iFindUser } from './googleAuth.model.js';
import mysql from 'mysql2';
import { db } from '../services/database.js';

interface iValues {
  profilePic?: any;
  displayName?: string;
  bio?: string;
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

export { editProfile };
