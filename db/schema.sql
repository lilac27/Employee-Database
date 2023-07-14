DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;


CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  position VARCHAR(30) NOT NULL DEFAULT '',
  department VARCHAR(30) NOT NULL,
  salary INT NOT NULL
)