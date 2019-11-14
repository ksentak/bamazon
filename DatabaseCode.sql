DROP DATABASE IF EXISTS test_db;

CREATE DATABASE test_DB;

USE test_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  Item VARCHAR(45) NULL,
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

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
