CREATE TABLE IF NOT EXISTS allocate (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_id VARCHAR(30) NOT NULL,
    permission_id VARCHAR(30) NOT NULL,

    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (permission_id) REFERENCES permission(id)
);
