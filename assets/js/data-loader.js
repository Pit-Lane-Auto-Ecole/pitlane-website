function loadCSVData(table) {
    const csvUrl = table.dataset.csv;

    fetch(csvUrl)
        .then((response) => response.text())
        .then((data) => {
            const lines = data.trim().split("\n");
            const headers = lines[0].split(",");
            const rows = lines.slice(1);

            const thead = table.querySelector("thead");
            thead.innerHTML = "";
            const headerRow = document.createElement("tr");
            headers.forEach((header) => {
                const th = document.createElement("th");
                th.textContent = header;
                th.className = "border px-4 py-2 bg-gray-200";
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            const tbody = table.querySelector("tbody");
            tbody.innerHTML = "";
            rows.forEach((line) => {
                const row = document.createElement("tr");
                row.className = "even:bg-gray-100";

                const cells = line.split(",");
                cells.forEach((cell) => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    td.className = "border px-4 py-2";
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
        })
        .catch((err) =>
            console.error("Erreur lors du chargement du CSV :", err)
        );
}

document.querySelectorAll("table[data-csv]").forEach((table) => {
    loadCSVData(table);
});
