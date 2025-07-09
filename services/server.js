const http = require("http");

function informazioniServer(server) {
  const { address, port } = server.address();
  const host = address === "::" ? "localhost" : address;
  console.log(`Server running at http://${host}:${port}/`);
}

const server = http
  .createServer((req, res) => {
    console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
    res.writeHead(200);
    res.end("Hello World\n");
  })
  .listen(8080, () => {
    console.log("Il server è in ascolto");
    informazioniServer(server);
  });
// This code creates a simple HTTP server that listens on port 3000 and responds with "Hello World" to any request.
// You can run this code by saving it to a file (e.g., `server.js`) and executing it with Node.js using the command `node server.js`.
// The server will then be accessible at `http://localhost:3000/` in your web browser or via tools like `curl` or Postman.
//   .listen();
// console.log(`Server running at http://localhost:${server.address().port}/`);
// Così invece se non viene defina la porta può essere letta automaticamente
