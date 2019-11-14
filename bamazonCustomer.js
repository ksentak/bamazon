require("dotenv").config();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PWD,
  database: "test_db"
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnection();
  });

  //MAKE SURE TO CORRECTLY CHANGE DATABASE NAME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
}