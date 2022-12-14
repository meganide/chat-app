import dotenv from 'dotenv';

dotenv.config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  DB_PASSWORD: process.env.DB_PASSWORD,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  DB_AWS_PASSWORD: process.env.DB_AWS_PASSWORD,
  DB_AWS_HOST: process.env.DB_AWS_HOST,
};

export { config };
