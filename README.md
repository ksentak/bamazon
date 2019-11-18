# Using Node and MySQL to create a store-front
This app was created so that a user can act as either a customer or a manager in a virtual store-front. 

## Using this app as a customer
The customer can open up virtual store-front in node. They are then prompted to select the id # of the item that they would like to purchase. Then the user will be asked the quantity of the item they would like to purchase. If a user enters a quantity that is greater than the quantity that is in-stock, they will be informed that they cannot complete their purchase. If the user purchases an item where there is enough quantity in-stock, they will be notified of a successful purchase, given their total cost, and the database will be updated to reflect the changes to the inventory. 

### Customer Video Demo
https://drive.google.com/file/d/1OKHrKAGEmc0VkBZM-h3M8NN61805SsZ6/view?usp=sharing

## Using this app as a manager
The manager application has much more functionality than the basic customer application. When the user starts the app in node, they have 4 different functions to choose from. The user can:
 1) View the current inventory 
 2) View the low inventory (Items with less than 10 in-stock) 
 3) Add to the inventory 
 4) Add an entirely new product to the inventory

### Manager Video Demo
https://drive.google.com/file/d/1aoM_ukJLAQaJvcoLFq9bm-JMYny4y3hJ/view?usp=sharing

## Technologies Used
* JavaScript
* MySQL
* Node.js
* Node Packages
  * Inquirer
  * DOTENV
  * Console.Table
  * MySQL

