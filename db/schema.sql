DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)

);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  position VARCHAR(30) NOT NULL DEFAULT '',
  department_id INT NOT NULL,
  salary INT NOT NULL,
  manager VARCHAR(30) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)

);



