//global variables
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require("console.table")
const chalk = require("chalk")
const clear = require('clear');
const figlet = require('figlet');

const {
    table
} = require("console");
const {
    hostname
} = require('os');

//SQL Connection 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pHarynx-Cr4ter-l4D#",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected as ID' + connection.threadId);
})

//initial load up
function initialLoad() {
    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('Employee Tracker', {
                horizontalLayout: 'full'
            })
        )
    );
}
initialLoad();
homePage();


//array for employee data
let employeeNamesArray = [];
let departmentsArray = ["Sales", "Account Management", "Risk", "HR", "Marketing"];
let rolesArray = ["Sales Manager", "Lead Salesperson", "Account Manager", "Junior Account Executive", "Risk Analyst", "BBB Specialist", "Marketing Designer", "Marketing Manager"];

//main screen functionality 
function homePage() {
    getEmployeeNames();
    //menu list for all functionality
    inquirer.prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                "View All Employees",
                "View Roles",
                "View Departments",
                "Update Employee Information",
                "Add New Employee",
                "Add Role To Company",
                "Add Department To Company",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
                "View Budget for Company",
                "Exit"
            ]
        }

        //switch statement to call to next function dependent by user choice
    ]).then(function (result) {
        switch (result.choice) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "View Departments":
                viewDepartments();
                break;

            case "Update Employee Information":
                updateEmployee();
                break;

            case "Add New Employee":
                addNewEmployee();
                break;

            case "Add Role To Company":
                addNewRole();
                break;

            case "Add Department To Company":
                addDept();
                break;

            case "Delete Employee":
                deleteEmployee();
                break;

            case "Delete Role":
                deleteRole();
                break;

            case "Delete Department":
                deleteDept();
                break;

            case "View Budget for Company":
                viewBudget();
                break;


            case "Exit":
                exit();
                break;
        }
    })


};
//All Function Calls

//function to call all employees from table
function viewAllEmployees() {
    connection.query(
        `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS role, department.name as department, role.salary, CONCAT (managers.first_name , " " , managers.last_name) AS Manager
      FROM role
      INNER JOIN employee ON employee.role_id = role.id 
      INNER JOIN department ON department.id = role.department_id
      LEFT JOIN employee AS managers ON employee.manager_id=managers.id
      ORDER BY employee.id;`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            homePage();
        })
}

//function to call all employees from role table
function viewRoles() {
    connection.query("SELECT * FROM role ", function (err, res) {
        if (err) throw err;
        console.table(res);
        homePage();
    })
}

//function to call all employees from department table
function viewDepartments() {
    connection.query("SELECT * FROM department ", function (err, res) {
        if (err) throw err;
        console.table(res);
        homePage();
    })
}

//update employee information
//issues start here
function updateEmployee() {
    // viewAllEmployees();
    inquirer.prompt([{
                type: "list",
                message: "Which employee would you like to update?",
                name: "name",
                choices: employeeNamesArray,
            },
            {
                type: "list",
                message: "What role would you like to assign?",
                name: "role",
                choices: rolesArray,
            },
        ])
        .then(function (data) {
            if (data.role === "Sales Manager") {
              num = 1;
            } else if (data.role === "Lead Salesperson") {
              num = 2;
            } else if (data.role === "Account Manager") {
              num = 3;
            } else if (data.role === "Junior Account Executive") {
                num = 4;
            } else if (data.role === "Risk Analyst") {
                num = 5;
            } else if (data.role === "BBB Specialist") {
                num = 6;
            } else if (data.role ===  "Marketing Designer") {
                num = 7;
            } else if (data.role === "Marketing Manager") {
                num = 8; 
            } else {
              num = 9;
            }
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  role_id: num,
                },
                {
                  first_name: data.name.split(" ")[0],
                },
              ],
              function (err, res) {
                if (err) throw err;
                console.log("Employee updated!");
                homePage();
              }
            );
          });
      }

function addNewEmployee() {
    inquirer.prompt([{
                type: "input",
                message: "What is the employees first name?",
                name: "first",
            },
            {
                type: "input",
                message: "What is the employees last name?",
                name: "last",
            },
            {
                type: "list",
                message: "What is the Employee's role?",
                name: "role",
                choices: rolesArray,
            },
        ])
        .then(function (choice) {
                if (choice.role === "Sales Manager") {
                    role_id = 1;
                    manager_id = 1;
                } else if (choice.role === "Lead Salesperson") {
                    role_id = 2;
                    manager_id = 1;
                } else if (choice.role === "Account Manager") {
                    role_id = 3;
                    manager_id = 2;
                } else if (choice.role === "Junior Account Executive") {
                    role_id = 4;
                    manager_id = 2;
                } else if (choice.role === "Risk Analyst") {
                    role_id = 5;
                    manager_id = 5;
                } else if (choice.role === "BBB Specialist") {
                    role_id = 8;
                    manager_id = 7;
                } else if (choice.role === "Marketing Designer") {
                    role_id = 7;
                    manager_id = 8;
                } else if (choice.role === "Marketing Manager") {
                    role_id = 8;
                    manager_id = 8;
                } else {
                    role_id = 9;
                    manager_id = 1;
                }
                    addEmployee(choice.first, choice.last, role_id, manager_id);
                    console.log("Employee added!");
                    getEmployeeNames();
                    viewAllEmployees();
                });
            }

        

    //function to add new employee
    function addEmployee(first, last, role_id, manager_id) {
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${first}", "${last}", ${role_id}, ${manager_id})`,
            function (err, res) {
                if (err) throw err;
            }
        );
    }

    function getEmployeeNames() {
        connection.query(
            `SELECT CONCAT(first_name, ' ', last_name) FROM employee;
              `,
            function (err, res) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    employeeNamesArray.push(res[i]["CONCAT(first_name, ' ', last_name)"]);
                }
                return employeeNamesArray;
            }
        );
        }
    //add role to company
    function addNewRole() {
        inquirer
            .prompt([{
                    type: "input",
                    message: "What is role name?",
                    name: "name",
                },
                {
                    type: "input",
                    message: "What is the role salary?",
                    name: "salary",
                },
                {
                    type: "list",
                    message: "What is the Departmant id?",
                    name: "department",
                    choices: departmentsArray,
                },
            ])
            .then((choice) => {
                if (choice.department === "Sales") {
                    num = 1;
                } else if (choice.department === "Account Management") {
                    num = 2;
                } else if (choice.department === "HR") {
                    num = 3;
                } else if (choice.department === "Marketing") {
                    num = 4;
                } else {
                    num = 5;
                }
                console.log(`department: ${choice.department} num: ${num}`);
                rolesArray.push(choice.name);
                connection.query(
                    `INSERT INTO role (title, salary, department_id)
                  VALUES ("${choice.name}", ${choice.salary}, ${num})
                  `,
                    function (err, res) {
                        if (err) throw err;
                        console.log("Role added!");
                        viewRoles();
                    }
                );
            });
    }
    

    //function to add department to company
    function addDept() {
        inquirer
            .prompt([{
                type: "input",
                message: "What department would you like to add?",
                name: "name",
            }, ])
            .then(function (choice) {
                connection.query(
                    `INSERT INTO department (name)
      VALUES ("${choice.name}")
        `,
                    function (err, res) {
                        if (err) throw err;
                        departmentsArray.push(choice.name);
                    }
                );
                console.log("Department Added!");
                viewDepartments();
            });
    }

    function deleteEmployee() {
        inquirer
            .prompt([{
                type: "list",
                message: "Which employee would you like to remove?",
                name: "name",
                choices: employeeNamesArray,
            }, ])
            .then(function (choice) {
                connection.query(
                    "DELETE FROM employee WHERE first_name = ?",
                    [choice.name.split(" ")[0]],
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        console.log("Employee removed!");
                        homePage();
                    }
                );
            });
    }

    function deleteRole() {
        inquirer.prompt([{
                type: "input",
                message: "What role do you want to delete?",
                name: "deleteRole",
            }, ])
            .then((answer) => {
                connection.query(
                    "DELETE FROM role WHERE title=?;",
                    [answer.deleteRole],
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        homePage();
                    }
                );
            });
    }

    function deleteDept() {
        inquirer.prompt([{
                type: "input",
                message: "What department do you want to delete?",
                name: "deleteDepartmentName",
            }, ])
            .then((answer) => {
                connection.query(
                    "DELETE FROM department WHERE name=?;",
                    [answer.deleteDepartmentName],
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        homePage();
                    }
                );
            });
    }

    function viewBudget() {
        inquirer
            .prompt([{
                type: "list",
                message: "Which budget would you like to see?",
                name: "department",
                choices: [
                    "Sales",
                    "Account Management",
                    "Risk",
                    "Marketing",
                    "HR",
                    "Total",
                    "Go Back",
                ],
            }, ])
            .then(function (choice) {
                if (choice.department === "Sales") {
                    end = "WHERE department.id = 1";
                } else if (choice.department === "Account Management") {
                    end = "WHERE department.id = 2";
                } else if (choice.department === "Risk") {
                    end = "WHERE department.id = 3";
                } else if (choice.department === "Marketing") {
                    end = "WHERE department.id = 4";
                } else if (choice.department === "HR") {
                    end = "WHERE department.id = 5";
                } else if (choice.department === "Total") {
                    end = "";
                } else {
                    homePage();
                    return;

                }
                connection.query(
                    `SELECT SUM(role.salary) AS budget FROM role INNER JOIN employee ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id ${end}
          `,
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        viewBudget();
                    }
                );
            });
    }



    //exit function to return user back to menu or out of program
    function exit() {
        clear();

        console.log(
            chalk.green(
                figlet.textSync('Long Live Reptar', {
                    horizontalLayout: 'full'
                })
            )
        );
        connection.end
        process.exit();
    }