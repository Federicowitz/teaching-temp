const message = document.querySelector("#message");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");

loadJSON();

async function loadJSON() {
  try {
    const response = await fetch("dati.json");

    if (!response.ok) {
      throw new Error("File JSON non trovato");
    }

    const data = await response.json();

    message.textContent = "Dati caricati da dati.json";

    renderTable(data);

  } catch (error) {
    message.textContent = "Errore nel caricamento dei dati.";
  }
}

function renderTable(data) {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "Nessun dato disponibile.";
    return;
  }

  const headers = Object.keys(data[0]);

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