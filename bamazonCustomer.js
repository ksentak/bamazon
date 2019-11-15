require("dotenv").config();
var mysql = require("mysql");
const cTable = require('console.table');


var connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.MYSQL_PWD,
  database: process.env.DATABASE
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnection();
  });

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      console.table(res);
      connection.end();
    });
}