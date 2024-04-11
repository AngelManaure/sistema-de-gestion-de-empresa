import mysql from "mysql2";

// Creación y exportación de la conexion a la base de datos :)
export const connection =  mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    database: process.env.DB || 'test',
    password: process.env.MYSQL_PASS || ''
  });
