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
    connection.end();
  });
}

function purchase() {
  inquirer
    .prompt([
      {
        name: "item",
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
      console.log("Your order has been placed")
      
      console.log(answer.item);
      console.log(answer.quantity);
      

      //Once order has been placed, check database to see IF answer.quantity < database quantity
      //IF answer.quantity > database quantity console.log("Insufficent quantity! There was an error placing your order. Please try again.")
      //IF answer.quantity < database quantity allow purchase to go through and update database
      //Display updated table
    });
}