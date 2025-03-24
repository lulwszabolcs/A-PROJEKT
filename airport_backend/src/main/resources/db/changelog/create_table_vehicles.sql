CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    license VARCHAR(10),
    vehicle_type VARCHAR(100),
    vehicle_year INT,
    vehicle_status VARCHAR(30),

    FOREIGN KEY (vehicle_type) REFERENCES vehicle_type(id),
    FOREIGN KEY (vehicle_status) REFERENCES vehicle_status(id)
);
