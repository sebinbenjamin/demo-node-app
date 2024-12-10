CREATE DATABASE IF NOT EXISTS mydb;

USE mydb;

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed TINYINT(1) NOT NULL DEFAULT 0
);

INSERT INTO todos (title, completed) VALUES
('Buy groceries', 0),
('Walk the dog', 1),
('Read a book', 0),
('Write code', 1),
('Exercise', 0);
