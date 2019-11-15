require("dotenv").config();
var mysql = require("mysql");

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

  //MAKE SURE TO CORRECTLY CHANGE DATABASE NAME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].item + " | " + res[i].price + " | " + res[i].quantity);
      }
      console.log("-----------------------------------");
      connection.end();
    });
}