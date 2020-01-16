var mysql = require("mysql");
var inquirer = require("inquirer");
const figlet = require('figlet');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the use
    figlet('Employee Manager', function(er, data) {
        if (er) return;
        console.log(data);
        askQuestions();
    });

});

function askQuestions() {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View departments, roles, employees",
            "Add to tables",
            "Update employee roles"
        ],
        name: "choice"
    }).then(answers => {
        // console.log(answers);
        switch (answers.choice) {
            case "View departments, roles, employees":
                viewTables()
                break;

            case "Add to tables":
                addTables()
                break;

            case "Update employee roles":
                updateRoles()
                break;

            default:
                connection.end()
                break;
        }
    })

}


function viewTables() {
    inquirer.prompt({
        message: "Which table would you like to view?",
        type: "list",
        choices: [
            "Employee Info",
            "Role Info",
            "Department Info"
        ],
        name: "choice"
    }).then(answers => {
        // console.log(answers);
        switch (answers.choice) {
            case "Employee Info":
                viewEmployees()
                break;

            case "Role Info":
                viewRoles()
                break;

            case "Department Info":
                viewDepartments()
                break;

            default:
                connection.end()
                break;
        }
    })
}

function viewEmployees() {
    connection.query(`SELECT employee.id,employee.first_name, employee.last_name, title, salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    JOIN role on employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`, function(err, data) {
        if (err) throw err;
        console.table(data);
        askQuestions();
    })
}

function viewRoles() {
    connection.query(`SELECT * FROM role`, function(err, data) {
        if (err) throw err;
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query(`SELECT * FROM department`, function(err, data) {
        if (err) throw err;
        console.table(data);
        askQuestions();
    })
}

function addTables() {
    inquirer.prompt({
        type: "list",
        message: "Which table do you want to add to?",
        name: "choice",
        choices: [
            "employee",
            "role",
            "department"
        ]
    }).then(answers => {
        // console.log(answers);
        switch (answers.choice) {
            case "employee":
                addEmployee()
                break;

            case "role":
                addRole()
                break;

            case "department":
                addDepartments()
                break;

            default:
                connection.end()
                break;
        }
    })
}

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function(answers) {
        // console.log(rangedAnswers);
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.roleId, answers.managerId], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addDepartments() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(answers) {
        // console.log(rangedAnswers);
        connection.query('INSERT INTO department (name) VALUES (?)', [answers.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([{
            type: "input",
            name: "role",
            message: "What is the new role of this employee?"
        },
        {
            type: "number",
            name: "id",
            message: "What is the ID of the person whose role you want change?"
        },
    ]).then(function(answers) {
        // console.log(rangedAnswers);
        connection.query('UPDATE products SET ? WHERE ?', [{
                rol: 100
            },
            {
                flavor: "Rocky Road"
            }
        ], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function updateRoles() {
    // query the database for all items being auctioned
    connection.query('SELECT id, title FROM role', function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer.prompt([{
                    name: "choice",
                    type: "rawlist",
                    message: "What is the new role of the employee?",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "id",
                    type: "number",
                    message: "What is the id of the employee"
                }
            ])
            .then(function(answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].title === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                // determine if bid was high enou
                // bid was high enough, so update db, let the user know, and start over
                connection.query(
                    "UPDATE employee SET ? WHERE ?", [{
                            role_id: chosenItem.id
                        },
                        {
                            id: answer.id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("Role was updated successfully!");
                        askQuestions();
                    }
                );
            });
    });
}