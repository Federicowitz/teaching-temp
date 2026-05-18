async function loadCounter() {

    const res = await fetch("/counter");

    const data = await res.json();

    document.getElementById("counter")
        .innerText = `Counter: ${data.count}`;
}

document.getElementById("btn")
    .addEventListener("click", async () => {

        await fetch("/increment", {
            method: "POST"
        });

        loadCounter();
    });

loadCounter();