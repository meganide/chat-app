import mysql from 'mysql2';
import { db } from '../services/database.js';
function getMembers(channelData) {
    const q = `
  SELECT u.displayName, u.profilePic
  FROM UserChannelMapping ucm
  INNER JOIN users u ON ucm.user_id = u.id
  WHERE ucm.channel_id = (SELECT id FROM Channels WHERE name = ${mysql.escape(channelData.name)});
  `;
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err)
                reject(err);
            resolve(results);
        });
    });
}
export { getMembers };
