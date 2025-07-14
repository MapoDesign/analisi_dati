// const server = require("./services/server");
const db = require("./services/db");

const messaggi = require("./services/messaggi");
const utenti = require("./services/utenti");

const { dati, cognomi, nomi, prefissi } = require("./services/dati_iniziali");

// Controllo connessione al database prima di avviare il server e le funzioni
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  } else {
    console.log("Connessione al database riuscita!");
    // Qui puoi avviare le tue funzioni solo dopo la connessione
    // messaggi.creazione_tabella("pippo");
    utenti.incrocio_dati();
    // Avvia qui anche il server, se vuoi che parta solo dopo la connessione
    require("./services/server");
  }
});
