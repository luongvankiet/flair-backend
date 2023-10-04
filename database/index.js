const mysql = require('mysql2');
const config = require('../config');
const util = require('util');

const pool = mysql.createPool(config.db);
pool.query = util.promisify(pool.query);

module.exports = pool;
