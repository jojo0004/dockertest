const mysql = require('mysql2');


const Database = mysql.createPool({
    host: "13.76.231.248",
    user: "adminkdcgroup",
    password: "Aa1212312121@@##",
    database: 'calproject',
    port:3306  ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset : 'utf8mb4'
})

module.exports = Database.promise();