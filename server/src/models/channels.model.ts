import mysql from 'mysql2';
import { db } from '../services/database.js';
import { iChannelData } from '../socket.js';

export interface channelData {
  name: string;
  description: string;
}

function createChannel(data: channelData) {
  const q = 'INSERT INTO Channels (`name`, `description`) VALUES (?)';
  const values = [data.name, data.description];

  return new Promise((resolve, reject) => {
    db.query(q, [values], (err, results: any) => {
      if (err) reject(err);
      if (results.affectedRows > 0) {
        console.log('Successfully created new channel: ', data.name);
      }
      resolve('Successfully added new channel to DB!');
    });
  });
}

function getChannels() {
  const q = `SELECT name, description FROM Channels`;
  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function saveUserToChannel(channelData: iChannelData) {
  console.log("trying to save user to channel", channelData.name)
  const { name, userId } = channelData; // this userId is the googleId we need to convert to id

  const q = `
  INSERT IGNORE INTO UserChannelMapping(user_id, channel_id)
  SELECT u.id, c.id
  FROM users u
  JOIN Channels c
  ON u.userId = ${mysql.escape(userId)} AND c.name = ${mysql.escape(name)};
  `;

  return new Promise((resolve, reject) => {
    db.query(q, (err, results: any) => {
      if (err) reject(err);

      if (results?.affectedRows > 0) {
        console.log(`Successfully saved ${userId} to channel!`);
      }

      resolve('Successfully added user to channel!');
    });
  });
}

export { createChannel, getChannels, saveUserToChannel };
