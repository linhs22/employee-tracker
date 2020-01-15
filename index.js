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
    database: "top_songsDB"
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
            "view all employees",
            "view all employees by department",
            "view all employees by manager",
            "add employees",
            "update employee role",
            "update employee manager",
            "view all roles",
            "add role",
            "remove role"
        ],
        name: "choice"
    }).then(answers => {
        // console.log(answers);
        switch (answers.choice) {
            case "view all employees":
                viewAllEmployees()
                break;

            case "view all employees by department":
                allEmployeesByDepartment()
                break;

            case "view all employees by manager":
                allEmployeesByManager()
                break;

            case "add employees":
                addEmployees()
                break;

            case "update employee role":
                updateEmployeeRole()
                break;

            case "update employee manager":
                updateEmployeeManager()
                break;

            case "view all roles":
                viewAllRoles()
                break;

            case "add role":
                addRole()
                break;

            case "remove role":
                removeRole()
                break;

            default:
                connection.end()
                break;
        }
    })

}