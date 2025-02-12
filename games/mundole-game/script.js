const paises = [
    { name: "Argentina", lat: -38.4161, lon: -63.6167, image: "images/argentina.png" },
    { name: "Brasil", lat: -14.2350, lon: -51.9253, image: "images/brasil.png" },
    { name: "Francia", lat: 46.6034, lon: 1.8883, image: "images/francia.png" }
];

let paisSecreto = paises[Math.floor(Math.random() * paises.length)];
document.getElementById("country-image").src = paisSecreto.image;

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

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

function verificarRespuesta() {
    const guess = document.getElementById("guess").value.trim();
    const paisElegido = paises.find(p => p.name.toLowerCase() === guess.toLowerCase());

    if (!paisElegido) {
        document.getElementById("feedback").innerText = "País no válido, intenta de nuevo.";
        return;
    }

    if (paisElegido.name === paisSecreto.name) {
        document.getElementById("feedback").innerText = "¡Correcto! Has adivinado el país.";
        return;
    }

    const distancia = calcularDistancia(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);
    const direccion = calcularDireccion(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);
    
    document.getElementById("feedback").innerText = `Estás a ${Math.round(distancia)} km de distancia hacia el ${direccion}.`;
}
