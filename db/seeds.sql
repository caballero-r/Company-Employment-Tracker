-- Initial data for departments --
INSERT INTO department (name)
VALUES ("Jungler"),
       ("Range DPS"),
       ("Melee Heavy"),
       ("Range AOE"),
       ("Melee Carry"),
       ("Support")

-- Initial data for roles --
INSERT INTO roles (title, salary, department_id)
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
VALUES ('Phantom', 'Saber', 1, NULL),
       ('Thunderbolt', 'Miya', 2, NULL),
       ('Ironhead', 'Tigreal', 3, NULL),
       ('Mystic', 'Cyclops', 4, NULL),
       ('Grandbishop', 'Estes', 5, NULL),
       ('Reaper', 'Argus', 6, NULL),
       ('Mysticdaggers', 'Karina', 7, 1),
       ('King', 'Franco', 8, 2),
       ('Shadowblade', 'Alucard', 9, 3),          