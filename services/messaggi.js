const connection = require("./db");

const { dati, cognomi, nomi, prefissi } = require("./dati_iniziali");

function creazione_tabella(tabella) {
  // Valida il nome della tabella (solo lettere, numeri e underscore)
  if (!/^[a-zA-Z0-9_]+$/.test(tabella)) {
    console.error("Nome tabella non valido");
    return;
  }
  connection.query(
    `CREATE TABLE IF NOT EXISTS \`${tabella}\` (
      id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      id_mittente VARCHAR(255) NOT NULL,
      id_destinatario VARCHAR(255) NOT NULL,
      oggetto VARCHAR(255) NOT NULL,
      messaggio TEXT NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4`,
    (err, results) => {
      if (err) console.error("Errore creazione tabella:", err);
      else console.log("Tabella messaggi creata:", results);
    }
  );
}

function inserimento_messaggio(
  id_mittente,
  id_destinatario,
  oggetto,
  messaggio
) {
  connection.query(
    "INSERT INTO messaggi (id_mittente, id_destinatario, oggetto, messaggio) VALUES (?, ?, ?, ?)",
    [id_mittente, id_destinatario, oggetto, messaggio],
    (err, results) => {
      if (err) console.error("Errore inserimento messaggio:", err);
      else console.log("Messaggio inserito:", results);
    }
  );
}

// ...Aggiungi qui tutte le altre funzioni relative ai messaggi (modifica, cancellazione, spostamento, ecc.)...

module.exports = {
  creazione_tabella,
  inserimento_messaggio,
  // ...altre funzioni...
};
