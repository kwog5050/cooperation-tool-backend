const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8585,
    user: "root",
    password: "0948",
    database: "test",
})

connection.connect(error => {
    if (error) throw error;
    console.log("Connection Success");
})

module.exports = connection;