USE employee_trackerDB;

INSERT INTO department (name) VALUES ('Sales'),('Engineering'),('Finance'),('Legal');
INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 100000,1),('Salesperson', 80000,1),('Lead Engineer', 150000,2),('Software Engineer', 120000,2),('Accountant', 125000,3),('Legal Team Lead', 250000,4),('Lawyer', 190000,4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ashley', 'Rodriquez',3,NULL),('Malia', 'Brown',5,NULL),('Sarah', 'Lourd',6,NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1,1),('Mike', 'Chan',2,4),('Kevin', 'Tupik',4,1),('Tom', 'Allen',7,3),('Christian', 'Eckenrode',3,5);

