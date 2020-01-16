USE employee_trackerDB;

INSERT INTO department (name) values ('Sales'),('Engineering'),('Finance'),('Legal');
INSERT INTO role (title, salary, department_id) values ('Sales Lead', 100000,1),('Salesperson', 80000,1),('Lead Engineer', 150000,2),('Software Engineer', 120000,2),('Accountant', 125000,3),('Legal Team Lead', 250000,4),('Lawyer', 190000,4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Ashley', 'Rodriquez',3,NULL),('Malia', 'Brown',5,NULL),('Sarah', 'Lourd',6,NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('John', 'Doe', 1,1),('Mike', 'Chan',2,4),('Kevin', 'Tupik',4,1),('Tom', 'Allen',7,3),('Christian', 'Eckenrode',3,5);

SELECT employee.id,employee.first_name, employee.last_name, title, salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee 
JOIN role on employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;