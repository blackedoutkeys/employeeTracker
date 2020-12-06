DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

-- DEPARTMENT TABLE ----
CREATE TABLE department
(
  id INT NOT NULL
  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
-- ROLE TABLE ----
CREATE TABLE role
  (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
--   CONSTRAINT FK_depart FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
-- EMPLOYEE ROLE TABLE ----
  CREATE TABLE employee
    (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
--   CONSTRAINT FK_manager FOREIGN KEY(manager_id) REFERENCES employee(id),
  -- https://www.mysqltutorial.org/mysql-on-delete-cascade/ -- 
--   CONSTRAINT FK_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE
);
