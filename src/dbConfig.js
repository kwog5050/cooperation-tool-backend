const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0948",
    database: "cooperation",
})

connection.connect(error => {
    if (error) throw error;
    console.log("Connection Success");
})

module.exports = connection;