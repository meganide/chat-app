import { db } from '../services/database.js';

interface channelData {
  name: string;
  description: string;
}

function createChannel(data: channelData) {
  const q = 'INSERT INTO Channels (`name`, `description`) VALUES (?)';
  const values = [data.name, data.description];

  return new Promise((resolve, reject) => {
    db.query(q, [values], (err, results) => {
      if (err) reject(err);
      resolve('Successfully added new channel to DB!');
    });
  });
}

function getChannels() {
  const q = `SELECT name FROM Channels`;
  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

export { createChannel, getChannels };
