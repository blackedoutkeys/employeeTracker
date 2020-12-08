DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

-- DEPARTMENT TABLE ----
CREATE TABLE department
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)

);
-- ROLE TABLE ----
CREATE TABLE role
  (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary decimal,
  department_id INT,
  PRIMARY KEY (id)
);

-- EMPLOYEE ROLE TABLE ----
 CREATE TABLE employee
    (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);
