import { db } from '../services/database.js';
function createChannel(data) {
    const { name, description } = data;
    const q = 'INSERT INTO channels (`name`, `description`) VALUES (?)';
    const values = [name, description];
    return new Promise((resolve, reject) => {
        db.query(q, [values], (err, results) => {
            if (err)
                reject(err);
            resolve('Successfully added new channel to DB!');
        });
    });
}
function getChannels() {
    const q = `SELECT name FROM CHANNELS`;
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err)
                reject(err);
            resolve(results);
        });
    });
}
export { createChannel, getChannels };
