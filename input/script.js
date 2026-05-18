const fallbackCSV = `nome,citta,eta,corso
Anna,Bologna,21,Marketing
Paolo,Firenze,22,Web
Elena,Genova,20,Design`;

const message = document.querySelector("#message");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");

loadCSV();

async function loadCSV() {
  try {
    const response = await fetch("data.csv");

    if (!response.ok) {
      throw new Error("File CSV non trovato");
    }

    const csvText = await response.text();

    message.textContent = "Dati caricati da dati.csv";

    const data = parseCSV(csvText);

    renderTable(data);

  } catch (error) {
    message.textContent = "Impossibile caricare dati.csv. Uso i dati di fallback.";

    const data = parseCSV(fallbackCSV);

    renderTable(data);
  }
}

function parseCSV(csvText) {
  const rows = [];
  
  const cleanText = csvText.trim();

  const lines = cleanText.split("\n");

  const firstLine = lines[0];

  const headers = firstLine.split(",");

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    const values = line.split(",");

    const row = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j].trim();
      const value = values[j].trim();

      row[header] = value;
    }

    rows.push(row);
  }

  return rows;
}

function renderTable(data) {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "Nessun dato da mostrare.";
    return;
  }

  const firstRow = data[0];

  const headers = Object.keys(firstRow);

  const headerRow = document.createElement("tr");

  for (const header of headers) {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  }

  tableHead.appendChild(headerRow);

  for (const row of data) {
    const tr = document.createElement("tr");

    for (const header of headers) {
      const td = document.createElement("td");
      td.textContent = row[header];
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  }
}