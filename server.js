// Variables for the required packages.
const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')

// Variables to initialize and set up express server.
const PORT = process.env.PORT || 3001
const app = express()

// Express middleware.
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
)

// Section with the inquirer prompts
function startInquirer() {
	inquirer
		.prompt([
			// Section where the user is presented with all their options
			{
				type: 'list',
				name: 'options',
				message: 'Please choose from the following options.',
				choices: [
					'View all departments',
					'View all roles',
					'View all employees',
					'Add a department',
					'Add a role',
					'Add an employee',
					'Update an employee',
				],
			},
		])
		.then((answers) => {
			// Switch statement to display functions depending on answers
			switch (answers.options) {
				case 'View all departments':
					viewAllDepartments()
					break
				case 'View all roles':
					viewAllRoles()
					break
				case 'View all employees':
					viewAllEmployees()
					break
                case 'Add a department':
                    addADepartment()
                    break    
			}
		})
		.catch((error) => {
			console.log(
				error,
				'Something went wrong, please restart the process. Thank you!'
			)
		})
}

// SQL queries

// View all department query
function viewAllDepartments() {
	db.query('SELECT * FROM department', (err, res) => {
		if (err) {
			console.log('An error has occurred, please restart the process')
		} else {
			console.table(res)
			startInquirer()
		}
	})
}

// View all roles query
function viewAllRoles() {
	db.query(
		'SELECT role.title AS "job title", role.id, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id',
		(err, res) => {
			if (err) {
				console.log('An error has occurred, please restart the process')
			} else {
				console.table(res)
				startInquirer()
			}
		}
	)
}

// View all employees query
function viewAllEmployees() {
	db.query(
		'SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title AS "job title", department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS "reporting manager" FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager on employee.manager_id = manager.id',
		(err, res) => {
			if (err) {
				console.log('An error has occurred, please restart the process')
			} else {
				console.table(res)
				startInquirer()
			}
		}
	)
}

// Adding a department
function addADepartment() {
    inquirer.
        prompt([
            // User is asked to input the name of the new department 
            {
                type: 'input',
                name: 'department',
                message: 'Please type the name of the new department you are creating'
            },
        ]) 
        .then((input) => {
            db.query('INSERT INTO department (name) VALUES (?)', input.department, (err, res) => {
                if (err) {
                    console.log('An error has occurred, please restart the process')
                } else {
                    console.log(res, `The new department "${input.department}" has been added to the database. View all departments to view new department`)
                    startInquirer()
                }
            })
		})		
        .catch((error) => {
			console.log(
				error,
				'Something went wrong, please restart the process. Thank you!'
			)
		})  
}

// Initiate Inquirer Prompt
startInquirer()

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
