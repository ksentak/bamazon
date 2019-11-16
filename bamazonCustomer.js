//Require all node packages
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

//Connection to MySQL
var connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.MYSQL_PWD,
  database: process.env.DATABASE
});

//Initial connection
connection.connect(function (err) {
  if (err) throw err;
  begin();
});

//Function that displays table and calls on user to purchase an item
function begin() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    purchase();
  });
}

//Purchase function that takes in user input with inquirer, then makes a call to the database, which checks if enough items are in stock for purchase and then allows a purchase to go through if enough product is in stock
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
            console.log("\nERROR!")
            console.log("\n----------------------------------------------------------\n")
            console.log("\nPLEASE TRY AGAIN!!!!!\n")
            begin();
          }
          
          else {
            var purchase = res[0];

            if (quantity > purchase.quantity) {
              console.log("\nWe're sorry but there is not enough of this item in stock for you to purchase.\n")
              console.log("\nPlease try again!\n")
              begin();              
            }

            else { 
              console.log("Success! Your order is being placed!")
              
              connection.query("UPDATE products SET quantity = " +(purchase.quantity - quantity)+ " WHERE id = "+item+";",
              function (err, res) {
                if (err) throw err;

                console.log("Order placed! Your total is $" +(purchase.price * quantity)+ ".")
                connection.end();
              } 
            )}
          }

        });
    });
}


