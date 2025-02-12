// Lista de países con coordenadas e imágenes
const paises = [
    { name: "Afghanistan", lat: 33.9391, lon: 67.71, image: "images/afghanistan.png" },
    { name: "Albania", lat: 41.1533, lon: 20.1683, image: "images/albania.png" },
    { name: "Algeria", lat: 28.0339, lon: 1.6596, image: "images/algeria.png" },
    { name: "Argentina", lat: -38.4161, lon: -63.6167, image: "images/argentina.png" },
    { name: "Australia", lat: -25.2744, lon: 133.7751, image: "images/australia.png" },
    { name: "Austria", lat: 47.5162, lon: 14.5501, image: "images/austria.png" },
    { name: "Azerbaijan", lat: 40.1431, lon: 47.5769, image: "images/azerbaijan.png" },
    { name: "Bahamas", lat: 25.0343, lon: -77.3963, image: "images/bahamas.png" },
    { name: "Bahrain", lat: 26.0667, lon: 50.5577, image: "images/bahrain.png" },
    { name: "Bangladesh", lat: 23.685, lon: 90.3563, image: "images/bangladesh.png" },
    { name: "Belarus", lat: 53.9006, lon: 27.559, image: "images/belarus.png" },
    { name: "Belgium", lat: 50.8503, lon: 4.3517, image: "images/belgium.png" },
    { name: "Belize", lat: 17.1899, lon: -88.4976, image: "images/belize.png" },
    { name: "Bolivia", lat: -16.2902, lon: -63.5887, image: "images/bolivia.png" },
    { name: "Brazil", lat: -14.235, lon: -51.9253, image: "images/brazil.png" },
    { name: "Canada", lat: 56.1304, lon: -106.3468, image: "images/canada.png" },
    { name: "Chile", lat: -35.6751, lon: -71.543, image: "images/chile.png" },
    { name: "China", lat: 35.8617, lon: 104.1954, image: "images/china.png" },
    { name: "Colombia", lat: 4.5709, lon: -74.2973, image: "images/colombia.png" },
    { name: "Cuba", lat: 21.5218, lon: -77.7812, image: "images/cuba.png" },
    { name: "Denmark", lat: 56.2639, lon: 9.5018, image: "images/denmark.png" },
    { name: "Ecuador", lat: -1.8312, lon: -78.1834, image: "images/ecuador.png" },
    { name: "Egypt", lat: 26.8206, lon: 30.8025, image: "images/egypt.png" },
    { name: "France", lat: 46.6034, lon: 1.8883, image: "images/france.png" },
    { name: "Germany", lat: 51.1657, lon: 10.4515, image: "images/germany.png" },
    { name: "India", lat: 20.5937, lon: 78.9629, image: "images/india.png" },
    { name: "Indonesia", lat: -0.7893, lon: 113.9213, image: "images/indonesia.png" },
    { name: "Iran", lat: 32.4279, lon: 53.688, image: "images/iran.png" },
    { name: "Ireland", lat: 53.1424, lon: -7.6921, image: "images/ireland.png" },
    { name: "Italy", lat: 41.8719, lon: 12.5674, image: "images/italy.png" },
    { name: "Japan", lat: 36.2048, lon: 138.2529, image: "images/japan.png" },
    { name: "Mexico", lat: 23.6345, lon: -102.5528, image: "images/mexico.png" },
    { name: "Spain", lat: 40.4637, lon: -3.7492, image: "images/spain.png" },
    { name: "United Kingdom", lat: 55.3781, lon: -3.436, image: "images/united_kingdom.png" },
    { name: "United States", lat: 37.0902, lon: -95.7129, image: "images/united_states.png" },
    { name: "Uruguay", lat: -32.5228, lon: -55.7658, image: "images/uruguay.png" },
    { name: "Venezuela", lat: 6.4238, lon: -66.5897, image: "images/venezuela.png" },
    { name: "Vietnam", lat: 14.0583, lon: 108.2772, image: "images/vietnam.png" },
    { name: "South Africa", lat: -30.5595, lon: 22.9375, image: "images/south_africa.png" }
];


let paisSecreto, intentos, juegoTerminado;
const maxIntentos = 5;
let historialPartidas = [];

// Inicializa el juego
function iniciarJuego() {
    paisSecreto = paises[Math.floor(Math.random() * paises.length)];
    intentos = 0;
    juegoTerminado = false; // Permite jugar nuevamente
    document.getElementById("country-image").src = paisSecreto.image;
    document.getElementById("feedback").innerText = "";
    document.getElementById("tabla-intentos").innerHTML = "";
    document.getElementById("guess").value = "";
    document.getElementById("guess").placeholder = "Escribir aquí el país";
    document.getElementById("suggestions").innerHTML = "";
}

// Reinicia el juego y guarda el historial de partidas
function reiniciarJuego() {
    historialPartidas.push(`Partida ${historialPartidas.length + 1}: ${intentos}/${maxIntentos} intentos - ${intentos < maxIntentos ? "Ganaste" : "Perdiste"} (País: ${paisSecreto.name})`);
    actualizarHistorialPartidas();
    iniciarJuego();
}

// Muestra el historial de partidas
function actualizarHistorialPartidas() {
    let lista = document.getElementById("lista-partidas");
    lista.innerHTML = "";
    historialPartidas.forEach(partida => {
        let item = document.createElement("li");
        item.classList.add("list-group-item");
        item.textContent = partida;
        lista.appendChild(item);
    });
}

// Función para calcular la distancia entre dos puntos (Fórmula de Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Función para calcular la dirección (N, S, E, O, NE, NO, SE, SO)
function calcularDireccion(lat1, lon1, lat2, lon2) {
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    if (dLat > 0 && dLon > 0) return "NE";
    if (dLat > 0 && dLon < 0) return "NO";
    if (dLat < 0 && dLon > 0) return "SE";
    if (dLat < 0 && dLon < 0) return "SO";
    if (dLat > 0) return "N";
    if (dLat < 0) return "S";
    if (dLon > 0) return "E";
    return "O";
}

// Función para verificar la respuesta del usuario
function verificarRespuesta() {
    if (juegoTerminado) return; // No permite más intentos si el juego terminó

    const guess = document.getElementById("guess").value.trim();
    const paisElegido = paises.find(p => p.name.toLowerCase() === guess.toLowerCase());

    if (!paisElegido) {
        document.getElementById("feedback").innerText = "País no válido, intenta de nuevo.";
        return;
    }

    intentos++;

    if (paisElegido.name === paisSecreto.name) {
        document.getElementById("feedback").innerText = `🎉 ¡Correcto! Adivinaste en ${intentos} intentos.`;
        juegoTerminado = true; // Bloquea más intentos
        return;
    }

    const distancia = calcularDistancia(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);
    const direccion = calcularDireccion(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);

    // Agregar intento al historial
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${paisElegido.name}</td><td>${Math.round(distancia)} km</td><td>${direccion}</td>`;
    document.getElementById("tabla-intentos").appendChild(fila);

    // Si se agotaron los intentos, mostrar "Game Over"
    if (intentos >= maxIntentos) {
        document.getElementById("feedback").innerText = `❌ GAME OVER. La respuesta correcta era ${paisSecreto.name}.`;
        juegoTerminado = true; // Bloquea más intentos
    } else {
        document.getElementById("feedback").innerText = `📍 ${Math.round(distancia)} km en dirección ${direccion}. Intento ${intentos}/${maxIntentos}.`;
    }

    // Reiniciar el input
    document.getElementById("guess").value = "";
    document.getElementById("guess").placeholder = "Escribir aquí el país";
}

// Filtrar países al escribir
document.getElementById("guess").addEventListener("input", function() {
    let filtro = this.value.toLowerCase();
    let sugerencias = paises.filter(pais => pais.name.toLowerCase().startsWith(filtro));

    let suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = "";
    
    if (filtro.length === 0) {
        suggestionsDiv.style.display = "none";
        return;
    }

    sugerencias.forEach(pais => {
        let div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = pais.name;
        div.onclick = function() {
            document.getElementById("guess").value = pais.name;
            suggestionsDiv.innerHTML = "";
            suggestionsDiv.style.display = "none";
        };
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = sugerencias.length > 0 ? "block" : "none";
});

// Iniciar el juego
iniciarJuego();
