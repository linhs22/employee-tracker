var mysql = require("mysql");
var inquirer = require("inquirer");

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
    askQuestions();
});

function askQuestions() {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View departments, roles, employees",
            "add to tables",
            "update emplpoye roles"
        ],
        name: "choice"
    }).then(answers => {
        // console.log(answers);
        switch (answers.choice) {
            case "View departments, roles, employees":
                viewTables()
                break;

            case "add to tables":
                addTables()
                break;

            case "update employee roles":
                updateRoles()
                break;

            default:
                connection.end()
                break;
        }
    })

}

function viewTables() {
    connection.query(`SELECT employee.id,employee.first_name, employee.last_name, title, salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee 
    JOIN role on employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`, function(err, data) {
        if (err) throw err;
        console.table(data);
        askQuestions();
    })
}