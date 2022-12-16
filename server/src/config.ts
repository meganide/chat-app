import dotenv from 'dotenv';

dotenv.config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export { config };
