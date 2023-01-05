import mysql from 'mysql2';

import { config } from '../config.js';

let dbOptions;

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  dbOptions = {
    host: 'localhost',
    user: 'root',
    password: config.DB_PASSWORD,
    database: 'chatify',
    multipleStatements: true,
  };
} else {
  dbOptions = {
    host: config.DB_AWS_HOST,
    user: 'admin',
    password: config.DB_AWS_PASSWORD,
    database: 'chatify',
    multipleStatements: true,
  };
}

const db = mysql.createConnection(dbOptions);

async function setupDatabase() {
  try {
    const tableExists = await checkIfTableExists();
    if (tableExists) {
      console.log('Tables already exist!');
    }
  } catch (error) {
    try {
      const resp = await createTables();
      console.log(resp)
    } catch (error) {
      console.log(error);
    }
  }
}

function checkIfTableExists() {
  const checkUsersTableExists = `SHOW TABLES LIKE 'users'`;

  return new Promise((resolve, reject) => {
    db.query(checkUsersTableExists, (err, results: any, fields) => {
      if (err) return err;

      if (results.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

function createTables() {
  const createTablesQuery = `
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(200),
    displayName VARCHAR(45),
    profilePic VARCHAR(200),
    provider VARCHAR(45),
    email VARCHAR(200),
    emailVerified TINYINT,
    bio TEXT,
    timeCreated DATETIME NOT NULL
  );
  
  CREATE TABLE Channels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    channelName VARCHAR(255) NOT NULL,
    description VARCHAR(255)
  );
  
  CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES Channels(id)
  );

  CREATE TABLE UserChannelMapping (
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    PRIMARY KEY (user_id, channel_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES Channels(id)
  );

  CREATE TABLE UserRooms (
    user_id INT NOT NULL,
    room VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, room),
    FOREIGN KEY (user_id) REFERENCES Users(id)
  );
  `;

  return new Promise((resolve, reject) => {
    db.query(createTablesQuery, (err, results) => {
      if (err) {
        reject('Table already exists!');
      }
      console.log('Creating tables!');
      resolve('Tables have been created successfully!');
    });
  });
}

export { db, setupDatabase };
