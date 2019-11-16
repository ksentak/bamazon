require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


var connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.MYSQL_PWD,
  database: process.env.DATABASE
});

connection.connect(function (err) {
  if (err) throw err;
  begin();
});

function begin() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    purchase();
  });
}

function purchase() {
  inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "What is the id of the item you would like to purchase?"
      },

      {
        name: "quantity",
        type: "input",
        message: "How many of this item would you like to purchase? (Enter quantity)"
      }

    ])
    .then(function (answer) {
      console.log("Your order is processing... One moment please.")

      var item = answer.itemID;
      var quantity = answer.quantity;

      connection.query("SELECT * FROM products WHERE ?",
        {
          id: item
        },
        function (err, res) {
          if (err) throw err;

          if (res.length == 0) {
            console.log("ERROR!")
          }
          else {
            var purchase = res[0];

            if (quantity > purchase.quantity) {
              console.log("We're sorry but there is not enough of this item in stock for you to purchase.")
            }

            else { 
              console.log("Success! Your order has placed!")
              // connection.query("UPDATE products SET quantity = " +(purchase.quantity - quantity)+ "WHERE id = "+item+";")
            }
          }

        });

    });
}