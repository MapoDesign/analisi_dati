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
  } else {
    console.log("Connessione al database riuscita!");
    console.log(
      "Connessione al database in corso... Così non si attiva prima del server!"
    );
    chiusura();
  }
});
console.log(
  "Connessione al database in corso... ATTENZIONE, questa operazione potrebbe arrivare prima della connessione al server!"
);

function chiusura() {
  connection.end((err) => {
    if (err) {
      console.error("Errore durante la chiusura della connessione:", err);
      return;
    } else console.log("Connessione al database chiusa correttamente!");
  });
}

// connection.destroy(); // Chiude la connessione al database in modo forzato
// connection.end(); // Chiude la connessione al database in modo pulito
