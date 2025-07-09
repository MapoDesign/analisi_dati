db = require("mysql");
const connection = db.createConnection({
  host: "localhost",
  password: "",
  user: "root",
  database: "analisi_dati",
});
connection.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connessione al database riuscita!");
});
