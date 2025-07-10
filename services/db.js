db = require("mysql");
const connection = db.createConnection({
  connectionLimit: 5,
  host: "localhost",
  password: "",
  user: "root",
  database: "analisi_dati", // Commentato per creare il database se non esiste
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

    // creazione_database();
    creazione_tabella();
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
  // pool.end((err) => {
  //   if (err) {
  //     console.error("Errore durante la chiusura del pool di connessioni:", err);
  //     return;
  //   } else console.log("Pool di connessioni chiuso correttamente!");
  // });
}

// connection.destroy(); // Chiude la connessione al database in modo forzato
// connection.end(); // Chiude la connessione al database in modo pulito

// Crea un pool di connessioni per gestire le richieste al database
// è da creare in alternativa alla connessione diretta
// Che è stata creata sopra
// const connection2 = {
//   connectionLimit: 5,
//   host: "localhost",
//   password: "",
//   user: "root",
//   database: "analisi_dati",
// };
// pool = db.createPool(connection2); // Crea un pool di connessioni
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error(
//       "Errore durante l'ottenimento della connessione dal pool:",
//       err
//     );
//     return;
//   }
//   console.log("Connessione ottenuta dal pool con successo!");
//   connection.release(); // Rilascia la connessione al pool
//   chiusura();
// });

function creazione_database() {
  connection.query(
    "CREATE DATABASE IF NOT EXISTS analisi_dati",
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la creazione del database:", err);
        return;
      }
      console.log("Database creato con successo:", results);
      // console.log("Database creato con successo:", results.affectedRows);
      // console.log("Database creato con successo:", results.insertId);
      // console.log("Database creato con successo:", results.warningCount);
      console.log("Database creato con successo:", results);
    }
  );
}

function creazione_tabella() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS messaggi (\
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT, \
    id_mittente VARCHAR(255) NOT NULL, \
    id_destinatario VARCHAR(255) NOT NULL, \
    oggetto VARCHAR(255) NOT NULL, \
    messaggio TEXT NOT NULL, \
    PRIMARY KEY (id) \
    )\
    ENGINE=MyISAM DEFAULT CHARSET=utf8mb4`,
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la creazione della tabella:", err);
        return;
      }
      console.log("Tabella creata con successo:", results);
    }
  );
}
