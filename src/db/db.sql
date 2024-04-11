CREATE DATABASE test;

USE test;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    usuario VARCHAR(30),
    email VARCHAR(50),
    password VARCHAR(500),
    PRIMARY KEY (id)
);