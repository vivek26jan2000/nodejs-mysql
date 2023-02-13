const mysql = require('mysql');
const connectDatabase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs_mysql'
});

connectDatabase.connect(err => {
  if (err) {
    console.warn('error in connection');
  }
});

module.exports = connectDatabase;
