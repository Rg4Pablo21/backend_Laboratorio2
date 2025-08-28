const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: 'bk1iexsnxgzu2peygvrd-mysql.services.clever-cloud.com',
  user: 'um3qxvenhinrtsbd',
  password: 'MPoyGY10YVX1xyT18ZhU',
  database: 'bk1iexsnxgzu2peygvrd',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  dateStrings: true,
  // Si Clever Cloud requiere SSL:
  ssl: { rejectUnauthorized: false }
});

module.exports = pool.promise();
