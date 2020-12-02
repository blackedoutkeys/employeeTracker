const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');

const mysql = require('mysql');


function homePage() {

    inquirer.prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                "View All Employees",
                "View Employees By Role",
                "View Employees By Department",
                "Update Employee Information",
                "Add New Employee",
                "Add Role To Company",
                "Add Department To Company",

            ]
        }

    ]).then(function (result) {
        switch (result.choices) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View Employees By Role":
                viewEmployeesByRole();
                break;

            case "View Employees By Department":
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
        }
    })


};