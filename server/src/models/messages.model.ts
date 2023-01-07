import mysql from 'mysql2';
import { db } from '../services/database.js';
import { iMsg } from '../socket.js';

function saveMessage(msg: iMsg) {
  const q = `
  INSERT INTO messages(user_id, channel_id, message, timestamp)
  SELECT ${mysql.escape(msg.userId)}, (SELECT id FROM channels WHERE name = ${mysql.escape(
    msg.channelName
  )}), ${mysql.escape(msg.message)}, ${mysql.escape(msg.date)}
  `;
  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) reject(err)

      resolve('Saved message to DB!')
    });
  });
}

export { saveMessage };
