const mysql = require("mysql2");

const connection = mysql.createConnection({
  connectionLimit: 5,
  host: "localhost",
  password: "",
  user: "root",
  database: "analisi_dati",
});

module.exports = connection;
