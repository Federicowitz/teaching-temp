const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;
const HOST = "fede"; //magic dns o mettere ip di tailnet 
//altrimenti 0.0.0.0 per tutte le interfacce di rete


app.use(express.json());

app.use(express.static("public")); //web server: serve file statici in public

function readCounter() {
    return JSON.parse(fs.readFileSync("counter.json"));
}

function writeCounter(data) {
    fs.writeFileSync("counter.json", JSON.stringify(data));
}

app.get("/counter", (req, res) => {
    res.json(readCounter());
});

app.post("/increment", (req, res) => {
    const data = readCounter();

    data.count++;

    writeCounter(data);

    res.json(data);
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});