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
    const resp = await createTables();
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
}

function createTables() {
  const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(200),
    displayName VARCHAR(45),
    profilePic VARCHAR(200),
    provider VARCHAR(45),
    email VARCHAR(200),
    emailVerified TINYINT,
    password VARCHAR(200),
    bio TEXT,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS Channels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255)
  );

  INSERT IGNORE INTO Channels (name, description)
  VALUES ('Welcome', 'Welcome to the community! Feel free to introduce yourself and join in on the conversation.');
  
  CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    message TEXT NOT NULL,
    date VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES Channels(id)
  );

  CREATE TABLE IF NOT EXISTS UserChannelMapping (
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    PRIMARY KEY (user_id, channel_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES Channels(id)
  );
  `;

  return new Promise((resolve, reject) => {
    db.query(createTablesQuery, (err, results) => {
      if (err) reject(err);
      resolve('Tables have been created successfully!');
    });
  });
}

export { db, setupDatabase };
