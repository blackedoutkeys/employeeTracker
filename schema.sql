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
  id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX depart_index (department_id),
    CONSTRAINT FK_depart FOREIGN KEY (department_id) REFERENCES department(id)
--   CONSTRAINT FK_depart FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
-- EMPLOYEE ROLE TABLE ----
  CREATE TABLE employee
    (
  id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_index (role_id),
    CONSTRAINT FK_role FOREIGN KEY (role_title) REFERENCES role(title),
    CONSTRAINT FK_role FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT,
    INDEX manager_index (manager_id),
    CONSTRAINT FK_manager FOREIGN KEY manager_id REFERENCES employee(id)
--   CONSTRAINT FK_manager FOREIGN KEY(manager_id) REFERENCES employee(id),
  -- https://www.mysqltutorial.org/mysql-on-delete-cascade/ -- 
--   CONSTRAINT FK_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE
);
