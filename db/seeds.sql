-- Initial data for departments --
INSERT INTO department (name)
VALUES ("Jungler"),
       ("Range DPS"),
       ("Melee Heavy"),
       ("Range AOE"),
       ("Melee Carry"),
       ("Support")

-- Initial data for roles --
INSERT INTO role (title, salary, department_id)
VALUES ('Assassin', 65000, 1),
       ('Marksman', 50000, 2),
       ('Tank', 70000, 3),
       ('Mage', 5000, 4),
       ('Healer', 70000, 6),
       ('Fighter', 65000, 5),
       ('Mage Assassin', 75000, 1),
       ('Tank Support', 80000, 6),
       ('Sword Specialist', 75000, 5);

-- Initial data for employees --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Phantom', 'Saber', 1, 7),
       ('Thunderbolt', 'Miya', 2, 8),
       ('Ironhead', 'Tigreal', 3, 8),
       ('Mystic', 'Cyclops', 4, 7),
       ('Grandbishop', 'Estes', 5, 8),
       ('Reaper', 'Argus', 6, 9),
       ('Mysticdaggers', 'Karina', 7, NULL),
       ('King', 'Franco', 8, NULL),
       ('Shadowblade', 'Alucard', 9, NULL);          