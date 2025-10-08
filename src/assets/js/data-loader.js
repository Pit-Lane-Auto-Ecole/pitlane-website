function loadCSVData(table) {
    const csvUrl = table.dataset.csv;
    const groupSize = parseInt(table.dataset.group) || 1;

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
                th.className = "border px-2 py-2 bg-gray-300";
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            const tbody = table.querySelector("tbody");
            tbody.innerHTML = "";
            rows.forEach((line, index) => {
                const row = document.createElement("tr");

                // ⚡ logique "groupée"
                const groupIndex = Math.floor(index / groupSize);
                if (groupIndex % 2 === 1) {
                    row.className = "bg-gray-200";
                } else {
                    row.className = "bg-white";
                }

                const cells = line.split(",");
                cells.forEach((cell) => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    td.className = "border px-1.5 py-1.5";
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
