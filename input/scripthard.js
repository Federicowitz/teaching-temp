// CSV di emergenza: viene usato se il file dati.csv non viene caricato
const fallbackCSV = `nome,citta,eta,corso
Anna,Bologna,21,Marketing
Paolo,Firenze,22,Web
Elena,Genova,20,Design`;

// Recupero dalla pagina gli elementi HTML che mi servono
const message = document.querySelector("#message");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");

// Avvio il programma
loadCSV();

async function loadCSV() {
  try {
    // Provo a caricare il file dati.csv dalla cartella del progetto
    const response = await fetch("dati.csv");

    // Se il file non viene trovato, forzo un errore
    if (!response.ok) {
      throw new Error("File CSV non trovato");
    }

    // Leggo il contenuto del file come testo
    const csvText = await response.text();

    message.textContent = "Dati caricati da dati.csv";

    // Trasformo il testo CSV in array di oggetti
    const data = parseCSV(csvText);

    // Mostro i dati in tabella
    renderTable(data);

  } catch (error) {
    // Se qualcosa fallisce, uso il CSV di fallback
    message.textContent = "Impossibile caricare dati.csv. Uso i dati di fallback.";

    const data = parseCSV(fallbackCSV);
    renderTable(data);
  }
}

function parseCSV(csvText) {
  // trim() elimina spazi e righe vuote all'inizio/fine del testo
  // split("\n") divide il testo in righe
  const lines = csvText.trim().split("\n");

  // lines[0] è la prima riga, cioè l'intestazione: nome,citta,eta,corso
  // split(",") la divide in colonne
  // map(...) crea un nuovo array trasformando ogni elemento
  // header.trim() pulisce ogni nome colonna da eventuali spazi
  const headers = lines[0].split(",").map(header => header.trim());

  // lines.slice(1) prende tutte le righe tranne la prima
  // map(...) trasforma ogni riga CSV in un oggetto JS
  const rows = lines.slice(1).map(line => {
    // Divido la riga in valori e pulisco ogni valore con trim()
    const values = line.split(",").map(value => value.trim());

    // Creo un oggetto vuoto che rappresenta una riga del CSV
    const row = {};

    // Associo ogni header al suo valore
    // Esempio: row["nome"] = "Luca"
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    return row;
  });

  return rows;
}

function renderTable(data) {
  // Svuoto eventuale tabella precedente
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "Nessun dato da mostrare.";
    return;
  }

  // Object.keys(data[0]) prende i nomi delle proprietà del primo oggetto
  // Esempio: { nome: "Luca", citta: "Roma" }
  // diventa: ["nome", "citta"]
  const headers = Object.keys(data[0]);

  // headers.map(...) crea un array di celle <th>
  // join("") unisce l'array in una singola stringa HTML
  tableHead.innerHTML = `
    <tr>
      ${headers.map(header => `<th>${header}</th>`).join("")}
    </tr>
  `;

  // data.map(...) crea una riga <tr> per ogni oggetto
  // dentro ogni riga, headers.map(...) crea una cella <td> per ogni proprietà
  // row[header] legge il valore usando il nome dinamico della colonna
  tableBody.innerHTML = data.map(row => `
    <tr>
      ${headers.map(header => `<td>${row[header]}</td>`).join("")}
    </tr>
  `).join("");
}


/*
Questa riga:

const headers = lines[0].split(",").map(header => header.trim());

vuol dire:

prendi la prima riga
dividila per virgole
pulisci ogni pezzo dagli spazi

Esempio:

"nome, citta, eta"
  .split(",")
  .map(header => header.trim());

Risultato:

["nome", "citta", "eta"]

Questa riga:

Object.keys(data[0])

prende il primo oggetto:

{
  nome: "Luca",
  citta: "Roma",
  eta: "18"
}

e restituisce:

["nome", "citta", "eta"]

Questa parte:

headers.map(header => `<th>${header}</th>`).join("")

prima crea questo array:

["<th>nome</th>", "<th>citta</th>", "<th>eta</th>"]

poi con join("") lo trasforma in:

<th>nome</th><th>citta</th><th>eta</th>
*/