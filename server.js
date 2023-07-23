// Variables for the required packages.
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

// Variables to initialize and set up express server.
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to Database
const db = mysql.createConnection(
	{
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'password',
		database: 'company_db',
	},
	console.log(`Connected to the company_db database.`)
); 

// Section with the inquirer prompts
function startInquirer() {
    inquirer
        .prompt([

        // Section where the user is presented with all their options
        {
            type: 'list',
            name: 'options',
            message: 'Please choose from the following options.',
            choices:[
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee'
            ],
        },
        ])
        .then((answers) => {
        
        // Switch statement to display functions depending on answers   
        switch (answers.options) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;    
        }   
            
        })
        .catch((error) => {
            console.log(error, 'Something went wrong, please restart the process. Thank you!')
        });
}

// SQL queries 

// View All Department Query
function viewAllDepartments () {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.log('An error has occurred, please restart the process');
        } else {
            console.table(res);
            startInquirer()
        }
    });
}

// View All Roles Query
function viewAllRoles () {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.log('An error has occurred, please restart the process');
        } else {
            console.table(res);
            startInquirer()
        }
    });
}

// Initiate Inquirer Prompt
startInquirer()

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});