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
                case 'Add a role':
                    addARole()
                    break     
                case 'Add an employee':
                    addAnEmployee()
                    break           
                case 'Update an employee':
                    updateAnEmployee()
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
            console.log('An error has occurred, routing back to home')
            startInquirer()
		} else {
			console.table(res)
			startInquirer()
		}
	})
}

// View all roles query
function viewAllRoles() {
	db.query(
		'SELECT role.title AS "job title", role.id AS "role ID", role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id',
		(err, res) => {
			if (err) {
                console.log('An error has occurred, routing back to home')
                startInquirer()
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
		'SELECT employee.id AS "employee ID", employee.first_name AS "first name", employee.last_name AS "last name", role.title AS "job title", department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS "reporting manager" FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager on employee.manager_id = manager.id',
		(err, res) => {
			if (err) {
                console.log('An error has occurred, routing back to home')
                startInquirer()
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
                    console.log('An error has occurred, routing back to home')
                    startInquirer()
                } else {
                    console.log(`The new department "${input.department}" has been added to the database. View all departments to view new department`)
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

// Adding a role
function addARole() {
    inquirer.
        prompt([
            // User is asked to input the information of the new role
            {
                type: 'input',
                name: 'title',
                message: 'Please type the name of the new role you are creating'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Please type the salary for this new role'
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Please type the department ID this role belongs to'
            },
        ]) 
        .then((answers) => {
            const { title, salary, department_id } = answers
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, res) => {
                if (err) {
                    console.log('An error has occurred, routing back to home')
                    startInquirer()
                } else {
                    console.log(`The new role "${answers.title}" has been added to the database. View all roles to view the new role`)
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

// Adding an employee
function addAnEmployee() {
    inquirer.
        prompt([
            // User is asked to input the information of the new employee
            {
                type: 'input',
                name: 'first_name',
                message: 'Please type the first name of the employee'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please type the last name of the employee'
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Please type the role ID this employee belongs to'
            },
            {
                type: 'number',
                name: 'manager_id',
                message: 'Please type the manager ID this employee reports to'
            },
        ]) 
        .then((answers) => {
            const { first_name, last_name, role_id, manager_id } = answers
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id], (err, res) => {
                if (err) {
                    console.log('An error has occurred, routing back to home')
                    startInquirer()
                } else {
                    console.log(`The new employee "${answers.first_name} ${answers.last_name}" has been added to the database. View all employees to view the new employee`)
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

// Update employee role ID
function updateAnEmployee() {
    inquirer.
        prompt([
            // User is asked to select an employee and to change the role ID
            {
                type: 'input',
                name: 'employee_id',
                message: 'Please type the employee ID number of the employee you would like to update. Please refer to employee table to determine employee ID number.'
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Please type the new role ID number of this employee. Please refer to role table to determine role ID numbers.'
            },
        ]) 
        .then((answers) => {
            const { employee_id, role_id } = answers
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id], (err, res) => {
                if (err) {
                    console.log('An error has occurred, routing back to home')
                    startInquirer()
                } else {
                    console.log(`This employee's role has been updated in the database. View all employees to view update`)
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
