CREATE TABLE IF NOT EXISTS users (
                                     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                                     username VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL,
    worker_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (status) REFERENCES user_status(id),
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    );