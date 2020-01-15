USE employee_trackerDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('John', 'Doe', 1,1),('Mike', 'Chan',2,1),('Ashley', 'Rodriquez',3,2),('Kevin', 'Tupik',4,2),('Malia', 'Brown',5,3),('Sarah', 'Lourd',6,4),('Tom', 'Allen',7,4),('Christian', 'Eckenrode',3,2);
INSERT INTO role (title, salary) values ('Sales Lead', 100000),('Salesperson', 80000),('Lead Engineer', 150000),('Software Engineer', 120000),('Accountant', 125000),('Legal Team Lead', 250000),('Lawyer', 190000);
INSERT INTO department (name) values ('Sales'),('Engineering'),('Finance'),('Legal');


