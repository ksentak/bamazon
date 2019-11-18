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
                    console.log("\nViewing products for sale\n");
                    showInventory();
                    connection.end();
                    break;
                case "View low inventory":
                    console.log("\nViewing low inventory\n");
                    lowInventory();
                    connection.end();
                    break;
                case "Add to inventory":
                    console.log("\nLet's add some items...");
                    addInventory();
                    break;
                case "Add new product":
                    console.log("Add");
                    addProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    connection.end();
            }
        });
}

//Function that displays entire inventory to manager
function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}

//Function that displays inventory of items that have stock of 10 or less
function lowInventory() {
    connection.query("SELECT * FROM products WHERE quantity < 10", function (err, res) {
        if (err) throw err;
        console.log("\nHere is a list of items that may need to be re-ordered soon.\n")
        console.table(res);
    });
}

//Function that adds stock of a product
function addInventory() {
    lowInventory();
    
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "Please enter the id of the item you would like to re-stock."
        },
        {
            name: "restock",
            type: "input",
            message: "How many of this item would you like to add?"
        }
    ])
    .then(function(answer) {
        var item = answer.itemID;
        var quantity = parseInt(answer.restock);

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
                    startMenu();
                }

                else {
                    var inventoryItem = res[0];
                    var inventoryQuantity = parseInt(inventoryItem.quantity);
                    
                    connection.query("UPDATE products SET quantity = "+ (inventoryQuantity + quantity) +" WHERE id = "+ item +";", 
                        function (err, res) {
                            if (err) throw err;
                            
                            console.log("\nHere is an updated list of the entire inventory:\n");
                            console.log("There are now "+(inventoryItem.quantity + quantity)+" of the "      +inventoryItem.item+" in stock.");
					        connection.end();
                        }
                    )
                }

            }
 
        )

    })
}

//Function that creates a new product
function addProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the name of the item you would like to add to your inventory?"
        }, 
        {
            name: "price",
            type: "input",
            message: "What is the price that you will charge for this item?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much of this item would you like to order to have in stock?"
        }
    ])
    .then(function(answer) {
        var newItem = answer.item;
        var newItemPrice = parseInt(answer.price);
        var newItemQuantity = parseInt(answer.quantity);

        console.log("\n"+newItemQuantity+" "+newItem+"('s) will be sold at the price of $"+newItemPrice+"\n");

        connection.query("INSERT INTO products SET ?",
          {
            item: newItem,
            price: newItemPrice,
            quantity: newItemQuantity
          },
            function(err, res) {
                if (err) throw err;
                console.log("\nYour item has successfully added to the inventory!\n");
                showInventory();
                connection.end();
            }
        )
    })
}