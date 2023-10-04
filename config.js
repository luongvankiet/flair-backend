require('dotenv').config();

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 60000,
    connectionLimit: 10,
    timezone: '+00:00'
  },
  listPerPage: 10,
};

module.exports = config;
