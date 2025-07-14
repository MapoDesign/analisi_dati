const connection = require("./db");
const { generaNumeroTelefono } = require("./utils");

const { dati, cognomi, nomi, prefissi } = require("./dati_iniziali");

function creazione_tabella_utenti() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS utenti (
      id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      cognome VARCHAR(255) NOT NULL,
      nome VARCHAR(255) NOT NULL,
      numeroTelefono VARCHAR(15) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4`,
    (err, results) => {
      if (err) console.error("Errore creazione tabella utenti:", err);
      else console.log("Tabella utenti creata:", results);
    }
  );
}

function inserimento_multiplo_cognomi_nomi(cognomi, nomi) {
  for (let i = 0; i < 100; i++) {
    const cognome = cognomi[Math.floor(Math.random() * cognomi.length)];
    const nome = nomi[Math.floor(Math.random() * nomi.length)];
    const numeroTelefono = generaNumeroTelefono();
    connection.query(
      "INSERT INTO utenti (cognome, nome, numeroTelefono) VALUES (?, ?, ?)",
      [cognome, nome, numeroTelefono],
      (err, results) => {
        if (err) console.error("Errore inserimento utente:", err);
        else console.log("Utente inserito:", results);
      }
    );
  }
}

// ...Aggiungi qui tutte le altre funzioni relative agli utenti...

module.exports = {
  creazione_tabella_utenti,
  inserimento_multiplo_cognomi_nomi,
  // ...altre funzioni...
};
