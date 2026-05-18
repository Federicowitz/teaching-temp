// CSV di emergenza se dati.csv non viene caricato
const fallbackCSV = `nome,citta,eta,corso
Anna,Bologna,21,Marketing
Paolo,Firenze,22,Web
Elena,Genova,20,Design`;

// Recupero elementi HTML dalla pagina
const message = document.querySelector("#message");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");

// Avvio il caricamento
loadCSV();

async function loadCSV() {
  try {
    // Provo a leggere dati.csv
    const response = await fetch("dati.csv");

    // Se la risposta non è valida, genero un errore
    if (!response.ok) {
      throw new Error("File CSV non trovato");
    }

    // Converto il file in testo
    const csvText = await response.text();

    message.textContent = "Dati caricati da dati.csv";

    // Parsing CSV
    const data = parseCSV(csvText);

    // Creazione tabella
    renderTable(data);

  } catch (error) {
    // Fallback se dati.csv non viene trovato
    message.textContent = "Impossibile caricare dati.csv. Uso i dati di fallback.";

    const data = parseCSV(fallbackCSV);
    renderTable(data);
  }
}

function parseCSV(csvText) {
  // Array finale che conterrà gli oggetti
  const rows = [];

  // trim() elimina spazi e righe vuote all'inizio/fine
  const cleanText = csvText.trim();

  // split("\n") divide il CSV in righe
  const lines = cleanText.split("\n");

  // La prima riga contiene i nomi delle colonne
  const firstLine = lines[0];

  // split(",") divide la riga delle intestazioni in singole colonne
  const headers = firstLine.split(",");

  // Parto da 1 perché lines[0] è l'intestazione
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    // Divido la riga corrente in valori
    const values = line.split(",");

    // Creo un oggetto vuoto per rappresentare questa riga
    const row = {};

    // Associo ogni colonna al valore corrispondente
    for (let j = 0; j < headers.length; j++) {
      // trim() pulisce eventuali spazi
      const header = headers[j].trim();
      const value = values[j].trim();

      // Uso le parentesi quadre perché header è una variabile
      // Esempio: row["nome"] = "Luca"
      row[header] = value;
    }

    // Aggiungo la riga-oggetto all'array finale
    rows.push(row);
  }

  return rows;
}

function renderTable(data) {
  // Svuoto la tabella prima di riempirla
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "Nessun dato da mostrare.";
    return;
  }

  // Prendo il primo oggetto dell'array
  const firstRow = data[0];

  // Object.keys restituisce i nomi delle proprietà dell'oggetto
  // Esempio: { nome: "Luca", citta: "Roma" }
  // diventa: ["nome", "citta"]
  const headers = Object.keys(firstRow);

  // Creo la riga delle intestazioni: <tr>
  const headerRow = document.createElement("tr");

  // Per ogni intestazione creo una cella <th>
  for (const header of headers) {
    const th = document.createElement("th");

    // textContent inserisce testo dentro l'elemento
    th.textContent = header;

    // Aggiungo il <th> dentro il <tr>
    headerRow.appendChild(th);
  }

  // Aggiungo la riga delle intestazioni dentro <thead>
  tableHead.appendChild(headerRow);

  // Creo una riga <tr> per ogni oggetto dell'array
  for (const row of data) {
    const tr = document.createElement("tr");

    // Per ogni colonna creo una cella <td>
    for (const header of headers) {
      const td = document.createElement("td");

      // row[header] legge il valore della proprietà
      // Esempio: row["nome"] oppure row["citta"]
      td.textContent = row[header];

      tr.appendChild(td);
    }

    // Aggiungo la riga al corpo della tabella
    tableBody.appendChild(tr);
  }
}

/*
creo una riga
creo una cella
metto testo nella cella
aggiungo la cella alla riga
aggiungo la riga alla tabella
*/