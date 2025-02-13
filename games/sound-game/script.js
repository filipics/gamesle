const correctColors = {
    argentina: ["celeste", "blanco", "celeste", "amarillo"]
};

let selectedColor = null;
let errors = 0;

document.addEventListener("DOMContentLoaded", function() {
    const flagSections = document.querySelectorAll(".flag-section");
    const colorPalette = document.getElementById("color-palette");
    const errorDisplay = document.getElementById("errors");
    
    // Generar colores aleatorios (incluyendo los correctos)
    const availableColors = ["rojo", "verde", "azul", "amarillo", "negro", "blanco", "celeste"];
    const shuffledColors = availableColors.sort(() => Math.random() - 0.5);

    shuffledColors.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color-option");
        colorDiv.style.backgroundColor = color;
        colorDiv.dataset.color = color;
        colorDiv.addEventListener("click", () => selectedColor = color);
        colorPalette.appendChild(colorDiv);
    });

    flagSections.forEach((section, index) => {
        section.addEventListener("click", () => {
            if (!selectedColor) return;

            const correctColor = correctColors.argentina[index];

            if (selectedColor === correctColor) {
                section.style.backgroundColor = selectedColor;
            } else {
                errors++;
                errorDisplay.textContent = errors;
                if (errors >= 5) alert("¡Perdiste!");
            }
        });
    });

    document.getElementById("reset-btn").addEventListener("click", () => location.reload());
});
