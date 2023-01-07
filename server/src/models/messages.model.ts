import mysql from 'mysql2';
import { db } from '../services/database.js';
import { iChannelData, iMsg } from '../socket.js';

function saveMessage(msg: iMsg) {
  const q = `
  INSERT INTO messages(user_id, channel_id, message, date)
  SELECT ${mysql.escape(msg.userId)}, (SELECT id FROM channels WHERE name = ${mysql.escape(
    msg.channelName
  )}), ${mysql.escape(msg.message)}, ${mysql.escape(msg.date)}
  `;

  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) {
        console.log(err)
        reject(err)
      }

      resolve('Saved message to DB!')
    });
  });
}

function getMessages(channelData: iChannelData) {

  const channelName = channelData.name;

  const q = 
  `
  SELECT Messages.message, Messages.date, users.displayName, users.profilePic
  FROM Messages
  INNER JOIN users ON Messages.user_id = users.id
  WHERE Messages.channel_id = (SELECT id FROM Channels WHERE name = ${mysql.escape(channelName)})
  `

  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) {
        console.log(err)
        reject(err)
      }

      resolve(results)
    });
  });
}

export { saveMessage, getMessages };
