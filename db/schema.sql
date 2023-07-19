-- Dropping any existing database with the same name & creating a new one --
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- Use company_db --
USE company_db;

-- Creating the department table --
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
);

-- Creating the role table --
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

-- Creating the employee table --
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);