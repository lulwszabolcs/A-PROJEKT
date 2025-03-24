CREATE TABLE IF NOT EXISTS problem (
    problem_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    date VARCHAR(30),
    problem_type VARCHAR(30) NOT NULL,
    status VARCHAR(30),
    role VARCHAR(30),

    FOREIGN KEY (problem_type) REFERENCES problem_type(id),
    FOREIGN KEY (status) REFERENCES problem_status(id),
    FOREIGN KEY (role) REFERENCES role(id)
);
