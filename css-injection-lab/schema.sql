CREATE DATABASE IF NOT EXISTS cyber_lab;
USE cyber_lab;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    secret_token VARCHAR(100) NOT NULL
);

INSERT INTO users (username, secret_token) VALUES ('admin', 'FLAG-CYBER-8700G');
