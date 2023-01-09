import mysql from 'mysql2';
import crypto from 'crypto';
import { db } from '../services/database.js';
import { cloudinaryV2 } from '../services/cloudinary.js';
import { verifyPassword } from '../routes/googleAuth/googleAuth.controller.js';
function getUserProfile(displayName) {
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
function editProfile(userId, values) {
    let promises = [];
    for (const property in values) {
        if (values[property]) {
            const editProfilePromise = updateUserProfile(property, values, userId);
            promises.push(editProfilePromise);
        }
    }
    return promises;
}
function checkIfNameExists(property, values) {
    if (property === 'displayName') {
        const findUserWithName = `SELECT displayName FROM users WHERE displayName = ${mysql.escape(values[property])}`;
        return new Promise((resolve, reject) => {
            db.query(findUserWithName, (err, results) => {
                if (err) {
                    console.log(err);
                    reject('Failed to change username!');
                }
                const userWithName = results;
                if (userWithName.length === 0) {
                    resolve('Username available!');
                }
                else if (userWithName.length > 0) {
                    reject('Username already exists!');
                }
            });
        });
    }
}
async function updateUserProfile(property, values, userId) {
    await checkIfNameExists(property, values);
    const updateUserProfile = `UPDATE users SET ${property} = ${mysql.escape(values[property])} WHERE userId = ${mysql.escape(userId)}`;
    return new Promise((resolve, reject) => {
        db.query(updateUserProfile, (err, results) => {
            if (err) {
                reject('Failed to edit profile!');
            }
            resolve('Successfully edited profile!');
        });
    });
}
async function uploadImageToCloudinary(userId, fileStr) {
    try {
        const uploadedResponse = await cloudinaryV2.uploader.upload(fileStr, {
            upload_preset: 'profile',
            folder: 'users/' + userId + '/profile',
            overwrite: true,
            public_id: 'profile_pic',
        });
        console.log(uploadedResponse);
        return uploadedResponse;
    }
    catch (err) {
        console.error(err);
        return 'Error';
    }
}
function findUser(email, password, done) {
    const q = `
  SELECT * FROM users WHERE email = ${mysql.escape(email)}
  `;
    return db.query(q, async (err, results) => {
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
function register(req, res, user) {
    const q = `
  SELECT * FROM users WHERE email = ? OR displayName = ?
  `;
    const values = [user.email, user.displayName];
    db.query(q, values, (err, results) => {
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
            return req.login(user, function (err) {
                console.log('user from reqlogin', user);
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                console.log('req.user', req.user);
                console.log('redirect');
                res.redirect('/');
            });
        });
    });
}
function generateRandomNumberString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += crypto.randomBytes(1).readUInt8(0) % 10;
    }
    return result;
}
function getUserId(email) {
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
