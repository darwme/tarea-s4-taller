import dotenv from "dotenv";
dotenv.config();

export const config = {
  host: process.env.MYSQLHOST || "localhost",
  port: process.env.MYSQLPORT || "3306",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLSPASSWORD || "123",
  database: process.env.MYSQLDATABASE || "users_service",
};
