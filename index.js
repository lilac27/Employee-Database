const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'goUtes2020$!',
    database: 'work_db',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
    // Call the function to start the application
    startApp();
  });

function startApp () {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add employee', 'View Departments', 'Add a Department', 'View Roles', 'Add a Role', 'Update employee', 'Exit'],
        },
    ])
    .then((answers) => {
    // Call appropriate function
        switch (answers.action) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'Exit':
                connection.end();
                console.log('Disconnected from database.');
                break;
        }
    });
}

function viewEmployees () {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp(); //go back to main menu
    });
}

function addEmployee () {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the employee name:',
        },
        {
            type: 'input',
            name: 'position',
            message: 'Enter the position of the employee:',
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department of the employee:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the employee:',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter the manager of the employee:',
        },
    ])
    .then((answers) => {
        const { name } = answers;
        //insert new employee into database
        connection.query(
            'INSERT INTO employees SET ?',
            { name },
            (err, result) => {
                if (err) throw err;
                console.log('Employee added successfully.');
                startApp(); //go back to main menu
            }
        );
    });
}

function viewDepartments() {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the department name:',
        },
    ])
    .then((answers) => {
        const { name } = answers;
        const department = { name };
        connection.query('INSERT INTO departments SET ?', department, (err, result) => {
            if (err) throw err;
            console.log('Department added successfully.');
            startApp();
        });
    });
}

function viewRoles() {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the role title:',
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter the role salary:',
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter the department ID for the role:',
        },
    ])
    .then((answers) => {
        const { title, salary, department } = answers;
        const role = { title, salary, department_id: department };
        connection.query('INSERT INTO roles SET ?', role, (err, result) => {
            if (err) throw err;
            console.log('Role added successfully.');
            startApp();
        });
    });
}

function updateEmployee() {
    inquirer
    .prompt([
        {
            type:'input',
            name: 'employeeId',
            message:'Enter the ID of the employee to update:',
        },
        {
            type: 'input',
            name: 'newTitle',
            message: 'Enter the new title for the employee:',
        },
    ])
    .then((answers) => {
        const { employeeId, newTitle } = answers;
        connection.query(
            'UPDATE employees SET title = ? WHERE id = ?',
            [newTitle, employeeId],
            (err, result) => {
                if (err) throw err;
                console.log('Employee updated successfully.');
                startApp();
            }
        );
    });
}
  