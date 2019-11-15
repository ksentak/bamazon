DROP DATABASE IF EXISTS inventory_db;

CREATE DATABASE inventory_DB;

USE inventory_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item, price, quantity)
VALUES ("TV", 299.99, 100);

INSERT INTO products (item, price, quantity)
VALUES ("PS4", 249.99, 120);

INSERT INTO products (item, price, quantity)
VALUES ("Call of Duty", 59.99, 75);

INSERT INTO products (item, price, quantity)
VALUES ("Toothpaste", 4.99, 30);

INSERT INTO products (item, price, quantity)
VALUES ("WD 2 TB External Hard Drive", 79.99, 15);

INSERT INTO products (item, price, quantity)
VALUES ("SanDisk 256GB MicroSD Card", 38.99, 20);

INSERT INTO products (item, price, quantity)
VALUES ("GoPro Hero 8", 399.00, 5);

INSERT INTO products (item, price, quantity)
VALUES ("Paper Towels", 19.99, 45);

INSERT INTO products (item, price, quantity)
VALUES ("Cozy Sweatshirt", 48.99, 50);

INSERT INTO products (item, price, quantity)
VALUES ("Adidas UltraBoost Sneakers", 179.99, 85);
