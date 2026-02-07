import serverlessMysql from "serverless-mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = serverlessMysql({
  config: {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    port: 3307,
  }
});