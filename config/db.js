require('dotenv').config();
const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
});

mySqlConnection.connect((err) => {
    if (!err) {
        console.log("Database Connected");
    } else {
        console.log("Database Connection Failed", err);
    }
});

module.exports = mySqlConnection;