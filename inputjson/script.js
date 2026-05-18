// Recupero elementi HTML dalla pagina
const message = document.querySelector("#message");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");

// Avvio il caricamento del JSON
loadJSON();

async function loadJSON() {
  try {
    // Carico il file dati.json
    const response = await fetch("dati.json");

    // Se il file non esiste o la risposta fallisce, genero un errore
    if (!response.ok) {
      throw new Error("File JSON non trovato");
    }

    // response.json() converte automaticamente il JSON in dati JavaScript
    // In questo caso otteniamo direttamente un array di oggetti
    const data = await response.json();

    message.textContent = "Dati caricati da dati.json";

    // Mostro i dati in tabella
    renderTable(data);

  } catch (error) {
    message.textContent = "Errore nel caricamento dei dati JSON.";
  }
}

function renderTable(data) {
  // Pulisco la tabella
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "Nessun dato disponibile.";
    return;
  }

  // Object.keys prende i nomi delle proprietà del primo oggetto
  // Esempio: ["nome", "citta", "eta", "corso"]
  const headers = Object.keys(data[0]);

  // Creo la riga delle intestazioni
  const headerRow = document.createElement("tr");

  for (const header of headers) {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  }

  tableHead.appendChild(headerRow);

  // Creo le righe della tabella
  for (const row of data) {
    const tr = document.createElement("tr");

    for (const header of headers) {
      const td = document.createElement("td");

      // row[header] permette di leggere valori usando il nome della colonna
      // Se header è "nome", allora row[header] equivale a row["nome"]
      td.textContent = row[header];

      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  }
}