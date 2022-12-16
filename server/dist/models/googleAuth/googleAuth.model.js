import mysql from 'mysql2';
import { db } from '../../services/database.js';
function findUserWithGoogleId(userId) {
    const findUser = `SELECT * FROM users WHERE userId = ${mysql.escape(userId)}`;
    return new Promise((resolve, reject) => {
        db.query(findUser, (err, results) => {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
function addUserToDb(profile) {
    const q = 'INSERT INTO users (`userId`, `displayName`, `profilePic`, `provider`, `email`, `emailVerified`) VALUES (?)';
    const userId = profile.id;
    const displayName = profile.displayName;
    const profilePic = profile._json.picture;
    const provider = profile.provider;
    const email = profile._json.email;
    const emailVerified = profile._json.email_verified;
    const values = [userId, displayName, profilePic, provider, email, emailVerified];
    db.query(q, [values], (err, data) => {
        if (err)
            throw err;
        return { data, message: 'Successfully added new user to DB!' };
    });
}
export { findUserWithGoogleId, addUserToDb };
