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
            choices: ['View all employees', 'Add employee', 'Exit'],
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
            name: 'title',
            message: 'Enter the title of the employee:',
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
  