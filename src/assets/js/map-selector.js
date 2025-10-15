function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
    } else {
        dropdown.classList.add("hidden");
    }
}

document.getElementById("mapSelector").addEventListener("change", function () {
    const selectedMapId = this.value;

    // Masquer toutes les cartes
    document.querySelectorAll(".map-content").forEach((content) => {
        content.classList.add("hidden");
    });

    // Afficher la carte sélectionnée
    if (selectedMapId) {
        document
            .getElementById(`tab-${selectedMapId}`)
            .classList.remove("hidden");
    }
});
