INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Account Management'),
    ('HR'),
    ('Marketing');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 110000, 1),
    ('Lead Salesperson', 96000, 1),
    ('Account Manager', 86500, 2),
    ('Junior Account Executive', 85600, 2),
    ('Risk Analyst', 75000, 3),
    ('BBB Specialist', 67500, 3),
    ('Marketing Designer', 93000, 4),
    ('Marketing Manager', 102500, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tommy', 'Pickles', 1, 1),
    ('Angelica', 'Pickles', 2, NULL),
    ('Charles', 'Finster', 2, 1),
    ('Phillip', 'DeVille', 3, 5),
    ('Lillian', 'DeVille', 3, 5),
    ('Susanna', 'Carmichael', 3, 5),
    ('Kimiko', 'Watanabe', 7, 8),
    ('Spike', 'TheDog', 8, 8);