// Lista de países con coordenadas e imágenes
const paises = [
    { name: "Afghanistan", lat: 33.9391, lon: 67.7100, image: "images/afghanistan.png" },
    { name: "Albania", lat: 41.1533, lon: 20.1683, image: "images/albania.png" },
    { name: "Argentina", lat: -38.4161, lon: -63.6167, image: "images/argentina.png" },
    { name: "Brazil", lat: -14.2350, lon: -51.9253, image: "images/brazil.png" },
    { name: "Canada", lat: 56.1304, lon: -106.3468, image: "images/canada.png" },
    { name: "France", lat: 46.6034, lon: 1.8883, image: "images/france.png" },
    { name: "Germany", lat: 51.1657, lon: 10.4515, image: "images/germany.png" },
    { name: "India", lat: 20.5937, lon: 78.9629, image: "images/india.png" },
    { name: "Japan", lat: 36.2048, lon: 138.2529, image: "images/japan.png" },
    { name: "Mexico", lat: 23.6345, lon: -102.5528, image: "images/mexico.png" },
    { name: "Spain", lat: 40.4637, lon: -3.7492, image: "images/spain.png" },
    { name: "United Kingdom", lat: 55.3781, lon: -3.4360, image: "images/united_kingdom.png" },
    { name: "United States", lat: 37.0902, lon: -95.7129, image: "images/united_states.png" },
    { name: "Venezuela", lat: 6.4238, lon: -66.5897, image: "images/venezuela.png" }
];

// Seleccionar un país aleatorio al inicio del juego
let paisSecreto = paises[Math.floor(Math.random() * paises.length)];

// Mostrar la imagen del país secreto
document.getElementById("country-image").src = paisSecreto.image;

// Llenar el select con opciones de países
const select = document.getElementById("guess");
paises.forEach(pais => {
    let option = document.createElement("option");
    option.value = pais.name;
    option.textContent = pais.name;
    select.appendChild(option);
});

// Recargar el selectpicker para que funcione con Bootstrap Select
$('.selectpicker').selectpicker('refresh');

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
    const guess = document.getElementById("guess").value;
    const paisElegido = paises.find(p => p.name === guess);

    if (!paisElegido) {
        document.getElementById("feedback").innerText = "País no válido, intenta de nuevo.";
        return;
    }

    if (paisElegido.name === paisSecreto.name) {
        document.getElementById("feedback").innerText = "🎉 ¡Correcto! Has adivinado el país.";
        return;
    }

    const distancia = calcularDistancia(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);
    const direccion = calcularDireccion(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);
    
    document.getElementById("feedback").innerText = `📍 Estás a ${Math.round(distancia)} km en dirección ${direccion}.`;
}
