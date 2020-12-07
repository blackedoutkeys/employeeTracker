//global variables
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require("console.table")
const chalk = require ("chalk")
const clear = require('clear');
const figlet = require('figlet');

const { table } = require("console");

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
    console.log ('Connected as ID' + connection.threadId);
   })

function initialLoad(){
    clear();

    console.log(
        chalk.yellow(
          figlet.textSync('Employee Tracker', { horizontalLayout: 'full' })
        )
      );
}
initialLoad();

//main screen functionality 
function homePage() {
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
                viewEmployeesByRole();
                break;

            case "View Departments":
                viewEmployeesbyDept();
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

            case "Exit":
                exit();
                break;
        }
    })


};
//All Function Calls

//function to call all employees from table
function viewAllEmployees() {
    connection.query("SELECT * FROM employee ", function (err, res) {
        if (err) throw err;
        console.table(res);
        homePage();
    })
}

//function to call all employees from role table
function viewEmployeesByRole() {
    connection.query("SELECT * FROM role ", function (err, res) {
        if (err) throw err;
        console.table(res);
        homePage();
    })
}

//function to call all employees from department table
function viewEmployeesbyDept() {
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
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "employeeUpdate",
        },
        {
            type: "input",
            message: "What do you want to update their role to?",
            name: "updateRole",
        },
     ])
        .then((answer) => {
            connection.query(
                "UPDATE employee SET role_id=? WHERE first_name= ?",
                [answer.updateRole, answer.employeeUpdate],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    homePage();
                }
            );
        });
}


function addNewEmployee() {
    inquirer.prompt([{
                type: "input",
                message: "What is the employees first name?",
                name: "aeFirstName",
            },
            {
                type: "input",
                message: "What is the employees last name?",
                name: "aeLastName",
            },
            {
                type: "input",
                message: "What is the employee's id number?",
                name: "aeId",
            },
            {
                type: "input",
                message: "What is the employee's manager id number?",
                name: "aeManagerId",
            }
           
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)",

                [
                    answer.aeFirstName,
                    answer.aeLastName,
                    answer.aeId,
                    answer.aeManagerId,
                ],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    homePage();
                }
            );
        });
}


//add role to company

function addNewRole() {
    inquirer.prompt([{
                type: "input",
                message: "What is the role you want to add?",
                name: "aRRole",
            },
            {
                type: "input",
                message: "What is the salary for the role?",
                name: "aRSalary",
            },
            {
                type: "input",
                message: "What is the department id number?",
                name: "aRId",
            },
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                [answer.aRRole, answer.aRSalary, answer.aRId],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    homePage();
                }
            );
        });
}

//function to add department to company
function addDept() {
    inquirer.prompt([{
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName",
        }, ])
        .then((answer) => {
            connection.query(
                "INSERT INTO department (name) VALUES (?)",
                [answer.departmentName],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    homePage();
                }
            );
        });
}

function deleteEmployee () {
    inquirer.prompt([{
        type: "input",
        message: "What is the first name of the employee do you want to delete?",
        name: "deleteFN",
    },
    {
        type: "input",
        message: "What is the last name of the employee do you want to delete?",
        name: "deleteLN",
    } ])
    .then((answer) => {
        connection.query(
            "DELETE FROM employee WHERE first_name=? AND last_name=?;",
            [answer.deleteFN, answer.deleteLN],
            (err, res) => {
                if (err) throw err;
                console.table(res);
                homePage();
            }
        );
    });
}

function deleteRole () {
    inquirer.prompt([{
        type: "input",
        message: "What role do you want to delete?",
        name: "deleteRole",
    }, ])
    .then((answer) => {
        connection.query(
            "DELETE FROM role WHERE title=?;" ,
            [answer.deleteRole],
            (err, res) => {
                if (err) throw err;
                console.table(res);
                homePage();
            }
        );
    });
}

function deleteDept () {
    inquirer.prompt([{
        type: "input",
        message: "What department do you want to delete?",
        name: "deleteDepartmentName",
    }, ])
    .then((answer) => {
        connection.query(
            "DELETE FROM department WHERE name=?;" ,
            [answer.deleteDepartmentName],
            (err, res) => {
                if (err) throw err;
                console.table(res);
                homePage();
            }
        );
    });
}

//exit function to return user back to menu or out of program
function exit() {
    clear();

    console.log(
        chalk.green(
          figlet.textSync('Long Live Reptar', { horizontalLayout: 'full' })
        )
      );
    connection.end
    process.exit();
    //connection.end();
}

homePage();
