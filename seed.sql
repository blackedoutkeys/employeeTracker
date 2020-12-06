INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Account Management'),
    ('Risk'),
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
    (first_name, last_name, manager_id, role_id)
VALUES
    ('Tommy', 'Pickles', 1, 1),
    ('Angelica', 'Pickles', NULL, 2),
    ('Charles', 'Finster', 2, 3),
    ('Phillip', 'DeVille', NULL, 4),
    ('Lillian', 'DeVille', 3, 5),
    ('Susanna', 'Carmichael', NULL, 6),
    ('Kimiko', 'Watanabe', 7, 7),
    ('Spike', 'TheDog', NULL, 8);