import mysql from 'mysql2';
import { db } from '../services/database.js';
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
export { editProfile };
