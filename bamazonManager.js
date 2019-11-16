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
  startMenu();
});

//Start menu that allows user to decide what action they want to perform
function startMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Select what you would like to do:",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View products for sale":
                    console.log("View products for sale");
                    break;
                case "View low inventory":
                    console.log("Low inventory");
                    break;
                case "Add to inventory":
                    console.log("Add inventory");
                    break;
                case "Add new product":
                    console.log("Add");
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    connection.end();

            }
        });
}