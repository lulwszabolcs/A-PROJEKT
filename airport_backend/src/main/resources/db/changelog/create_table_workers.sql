CREATE TABLE IF NOT EXISTS workers (
    worker_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    worker_name VARCHAR(30) NOT NULL,
    worker_title VARCHAR(30) NOT NULL,
    phone_number VARCHAR(30),
    email VARCHAR(30),
    wage INT,
    FOREIGN KEY (worker_title) REFERENCES role(id)
    );