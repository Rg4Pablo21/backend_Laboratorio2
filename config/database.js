const mysql2 = require('mysql2');

const pool = mysql2.createPool({
  host: 'bk1iexsnxgzu2peygvrd-mysql.services.clever-cloud.com',
  user: 'um3qxvenhinrtsbd',
  password: 'MPoyGY10YVX1xyT18ZhU',
  database: 'bk1iexsnxgzu2peygvrd',
});

module.exports = pool.promise();