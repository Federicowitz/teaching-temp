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
    const response = await fetch("dati.csv");

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
  const lines = csvText.trim().split("\n");

  const headers = lines[0].split(",").map(header => header.trim());

  const rows = lines.slice(1).map(line => {
    const values = line.split(",").map(value => value.trim());

    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    return row;
  });

  return rows;
}

function renderTable(data) {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "Nessun dato da mostrare.";
    return;
  }

  const headers = Object.keys(data[0]);

  tableHead.innerHTML = `
    <tr>
      ${headers.map(header => `<th>${header}</th>`).join("")}
    </tr>
  `;

  tableBody.innerHTML = data.map(row => `
    <tr>
      ${headers.map(header => `<td>${row[header]}</td>`).join("")}
    </tr>
  `).join("");
}