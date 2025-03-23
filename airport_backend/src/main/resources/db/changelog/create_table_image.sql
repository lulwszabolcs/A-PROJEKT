CREATE TABLE IF NOT EXISTS image (
    image_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    image_name VARCHAR(30),
    image_path VARCHAR(30),
    worker_id INT,

    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
);
