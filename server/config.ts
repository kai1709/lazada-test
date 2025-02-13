require('dotenv').config();

const config = {
  ENV: process.env.ENV || 'development',
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 8000,
}

export default config
