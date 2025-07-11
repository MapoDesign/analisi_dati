db = require("mysql");
fs = require("fs");
const connection = db.createConnection({
  connectionLimit: 5,
  host: "localhost",
  password: "",
  user: "root",
  database: "analisi_dati", // Commentato per creare il database se non esiste
});

const dati = [
  [
    2,
    2,
    "Frase di oggi",
    "Il successo è la somma di piccoli sforzi ripetuti giorno dopo giorno.",
  ],
  [
    3,
    3,
    "Frase di oggi",
    "Non arrenderti mai, perché quando pensi che sia tutto finito, è il momento in cui tutto ha inizio.",
  ],
  [4, 4, "Frase di oggi", "Credi in te stesso e tutto sarà possibile."],
  [
    5,
    5,
    "Frase di oggi",
    "Le grandi cose non vengono mai dalla zona di comfort.",
  ],
  [
    6,
    6,
    "Frase di oggi",
    "Ogni giorno è una nuova opportunità per ricominciare.",
  ],
  [
    7,
    7,
    "Frase di oggi",
    "La determinazione di oggi costruisce il successo di domani.",
  ],
  [
    8,
    8,
    "Frase di oggi",
    "Non aspettare il momento perfetto, cogli l’attimo e rendilo perfetto.",
  ],
  [
    9,
    9,
    "Frase di oggi",
    "Il futuro appartiene a chi crede nella bellezza dei propri sogni.",
  ],
];

const cognomi = ["Rossi", "Bianchi", "Verdi", "Neri", "Gialli", "Blu"];

const nomi = ["Mario", "Giovanni", "Luca", "Marco", "Andrea", "Francesco"];

const prefissi = [338, 339, 340, 347, 348];

function generaNumeroTelefono() {
  const prefisso = prefissi[Math.floor(Math.random() * prefissi.length)];
  const numero = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0");
  return `${prefisso}${numero}`;
}

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
    // creazione_tabella();
    // inserimento_messaggio(
    //   1,
    //   1,
    //   "Benvenuto",
    //   "Ciao, questo è un messaggio di prova"
    // );
    // inserimento_multiplo();
    // creazione_tabella_utenti();
    // inserimento_multiplo_cognomi_nomi();
    // ricerca();
    // salvataggio_dati();
    // modifica("id_destinatario", 3, 6);
    // aggiunta_campo();
    // disattiva([5, 9, 7]);
    // cancellazione(5);
    cancellazione_filtro("Mario", "Rossi");
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

function inserimento_messaggio(
  id_mittente,
  id_destinatario,
  oggetto,
  messaggio
) {
  connection.query(
    "INSERT INTO messaggi (id_mittente, id_destinatario, oggetto, messaggio) VALUES (?, ?, ?, ?)",
    [id_mittente, id_destinatario, oggetto, messaggio],
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante l'inserimento del messaggio:", err);
        return;
      }
      console.log("Messaggio inserito con successo:", results);
    }
  );
}

function inserimento_multiplo() {
  dati.forEach((d) => {
    connection.query(
      "INSERT INTO messaggi (id_mittente, id_destinatario, oggetto, messaggio) VALUES (?, ?, ?, ?)",
      d,
      (err, results, fields) => {
        if (err) {
          console.error("Errore durante l'inserimento del messaggio:", err);
          return;
        }
        console.log("Messaggio inserito con successo:", results);
      }
    );
  });
}

function inserimento_multiplo_cognomi_nomi() {
  for (let i = 0; i < 100; i++) {
    const cognome = cognomi[Math.floor(Math.random() * cognomi.length)];
    const nome = nomi[Math.floor(Math.random() * nomi.length)];
    const numeroTelefono = generaNumeroTelefono();
    connection.query(
      "INSERT INTO utenti (cognome, nome, numeroTelefono) VALUES (?, ?, ?)",
      [cognome, nome, numeroTelefono],
      (err, results, fields) => {
        if (err) {
          console.error("Errore durante l'inserimento dell'utente:", err);
          return;
        }
        console.log("Utente inserito con successo:", results);
      }
    );
  }
}

function creazione_tabella_utenti() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS utenti (\
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT, \
    cognome VARCHAR(255) NOT NULL, \
    nome VARCHAR(255) NOT NULL, \
    numeroTelefono VARCHAR(15) NOT NULL, \
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

function ricerca() {
  connection.query(
    "SELECT * FROM messaggi WHERE oggetto LIKE ?",
    ["%Frase di oggi%"],
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la ricerca:", err);
        return;
      }
      console.log("Risultati della ricerca:", results);
    }
  );
}

function salvataggio_dati() {
  connection.query(
    "SELECT * FROM utenti ORDER BY COGNOME DESC",
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la ricerca:", err);
        return;
      }
      console.log("Risultati della ricerca:", results);
      for (x of results) {
        console.log(
          `Cognome: ${x.cognome}, Nome: ${x.nome}, Telefono: ${x.numeroTelefono}`
        );
        fs.appendFile(
          "utenti.txt",
          `Cognome: ${x.cognome}, Nome: ${x.nome}, Telefono: ${x.numeroTelefono}\n`,
          (err) => {
            if (err) {
              console.error("Errore durante il salvataggio dei dati:", err);
              return;
            }
            console.log("Dati salvati correttamente nel file utenti.txt");
          }
        );
      }
    }
  );
}
function modifica(campo, valore, id) {
  connection.query(
    `UPDATE messaggi SET ${campo} = ? WHERE id = ?`,
    [valore, id],
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la modifica:", err);
        return;
      }
      console.log("Modifica effettuata con successo:", results);
    }
  );
}

function aggiunta_campo() {
  connection.query(
    "ALTER TABLE messaggi ADD COLUMN attivo BOOLEAN DEFAULT TRUE",
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante l'aggiunta del campo:", err);
        return;
      }
      console.log("Campo aggiunto con successo:", results);
    }
  );
}

function disattiva(id) {
  query = "UPDATE messaggi SET attivo = FALSE WHERE id in (?)";
  connection.query(query, [id], (err, results, fields) => {
    if (err) {
      console.error("Errore durante la disattivazione:", err);
      return;
    }
    console.log("Disattivazione effettuata con successo:", results);
  });
}

function cancellazione(id) {
  connection.query(
    "DELETE FROM messaggi WHERE id = ?",
    [id],
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la cancellazione:", err);
        return;
      }
      console.log("Cancellazione effettuata con successo:", results);
    }
  );
}

function cancellazione_filtro(nome, cognome) {
  connection.query(
    "DELETE FROM utenti WHERE nome = ? AND cognome = ?",
    [nome, cognome],
    (err, results, fields) => {
      if (err) {
        console.error("Errore durante la cancellazione:", err);
        return;
      }
      console.log("Cancellazione effettuata con successo:", results);
    }
  );
}
