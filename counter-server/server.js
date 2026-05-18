const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0"; //espongo su tutte le interfacce di rete compreso tailnet
//posso usare magic dns o indirizzo di tailnet della macchina che trovo su dashboard web o
//semplicemente facendo cmd: "tailscale ip -4" della macchina che espone il servizio
//se usassi indirizzo di loopback 127.0.0.1 (localhost) non sarebbe visibile in lan e su tailnet
app.use(express.json());

function readCounter() {
    return JSON.parse(fs.readFileSync("counter.json"));
}

function writeCounter(data) {
    fs.writeFileSync("counter.json", JSON.stringify(data));
}

app.get("/", (req, res) => {
    const data = readCounter();

    res.send(`
        <h1>Counter: ${data.count}</h1>

        <button onclick="increment()">Incrementa</button>

        <script>
            async function increment() {
                await fetch('/increment', {
                    method: 'POST'
                });

                location.reload();
            }
        </script>
    `);
});

app.post("/increment", (req, res) => {
    const data = readCounter();

    data.count++;

    writeCounter(data);

    res.json(data);
});

app.listen(PORT, HOST, () => {
    console.log("Server running  on " + `http://${HOST}:${PORT}` );
});