// Lista de países con coordenadas e imágenes
const paises = [
    { name: "Afghanistan", lat: 33.9391, lon: 67.7100, image: "images/afghanistan.png" },
    { name: "Albania", lat: 41.1533, lon: 20.1683, image: "images/albania.png" },
    { name: "Algeria", lat: 28.0339, lon: 1.6596, image: "images/algeria.png" },
    { name: "Andorra", lat: 42.5078, lon: 1.5218, image: "images/andorra.png" },
    { name: "Angola", lat: -11.2027, lon: 17.8739, image: "images/angola.png" },
    { name: "Antigua and Barbuda", lat: 17.0608, lon: -61.7964, image: "images/antigua_and_barbuda.png" },
    { name: "Argentina", lat: -38.4161, lon: -63.6167, image: "images/argentina.png" },
    { name: "Armenia", lat: 40.0691, lon: 45.0382, image: "images/armenia.png" },
    { name: "Australia", lat: -25.2744, lon: 133.7751, image: "images/australia.png" },
    { name: "Austria", lat: 47.5162, lon: 14.5501, image: "images/austria.png" },
    { name: "Azerbaijan", lat: 40.1431, lon: 47.5769, image: "images/azerbaijan.png" },
    { name: "Bahamas", lat: 25.0343, lon: -77.3963, image: "images/bahamas.png" },
    { name: "Bahrain", lat: 26.0667, lon: 50.5577, image: "images/bahrain.png" },
    { name: "Bangladesh", lat: 23.6850, lon: 90.3563, image: "images/bangladesh.png" },
    { name: "Barbados", lat: 13.1939, lon: -59.5432, image: "images/barbados.png" },
    { name: "Belarus", lat: 53.9006, lon: 27.5590, image: "images/belarus.png" },
    { name: "Belgium", lat: 50.8503, lon: 4.3517, image: "images/belgium.png" },
    { name: "Belize", lat: 17.1899, lon: -88.4976, image: "images/belize.png" },
    { name: "Benin", lat: 9.3077, lon: 2.3158, image: "images/benin.png" },
    { name: "Bhutan", lat: 27.5142, lon: 90.4336, image: "images/bhutan.png" },
    { name: "Bolivia", lat: -16.2902, lon: -63.5887, image: "images/bolivia.png" },
    { name: "Bosnia and Herzegovina", lat: 43.9159, lon: 17.6791, image: "images/bosnia_and_herzegovina.png" },
    { name: "Botswana", lat: -22.3285, lon: 24.6849, image: "images/botswana.png" },
    { name: "Brazil", lat: -14.2350, lon: -51.9253, image: "images/brazil.png" },
    { name: "Brunei", lat: 4.5353, lon: 114.7277, image: "images/brunei.png" },
    { name: "Bulgaria", lat: 42.7339, lon: 25.4858, image: "images/bulgaria.png" },
    { name: "Burkina Faso", lat: 12.2383, lon: -1.5616, image: "images/burkina_faso.png" },
    { name: "Burundi", lat: -3.3731, lon: 29.9189, image: "images/burundi.png" },
    { name: "Cabo Verde", lat: 16.5388, lon: -23.0418, image: "images/cabo_verde.png" },
    { name: "Cambodia", lat: 12.5657, lon: 104.9910, image: "images/cambodia.png" },
    { name: "Cameroon", lat: 7.3697, lon: 12.3547, image: "images/cameroon.png" },
    { name: "Canada", lat: 56.1304, lon: -106.3468, image: "images/canada.png" },
    { name: "Central African Republic", lat: 6.6111, lon: 20.9394, image: "images/central_african_republic.png" },
    { name: "Chad", lat: 15.4542, lon: 18.7322, image: "images/chad.png" },
    { name: "Chile", lat: -35.6751, lon: -71.5430, image: "images/chile.png" },
    { name: "China", lat: 35.8617, lon: 104.1954, image: "images/china.png" },
    { name: "Colombia", lat: 4.5709, lon: -74.2973, image: "images/colombia.png" },
    { name: "Comoros", lat: -11.6455, lon: 43.3333, image: "images/comoros.png" },
    { name: "Congo (Congo-Brazzaville)", lat: -0.2280, lon: 15.8277, image: "images/congo_(congo-brazzaville).png" },
    { name: "Costa Rica", lat: 9.7489, lon: -83.7534, image: "images/costa_rica.png" },
    { name: "Croatia", lat: 45.1000, lon: 15.2000, image: "images/croatia.png" },
    { name: "Cuba", lat: 21.5218, lon: -77.7812, image: "images/cuba.png" },
    { name: "Cyprus", lat: 35.1264, lon: 33.4299, image: "images/cyprus.png" },
    { name: "Czech Republic", lat: 49.8175, lon: 15.4720, image: "images/czech_republic.png" }
    { name: "Democratic Republic of the Congo", lat: -4.0383, lon: 21.7587, image: "images/democratic_republic_of_the_congo.png" },
    { name: "Denmark", lat: 56.2639, lon: 9.5018, image: "images/denmark.png" },
    { name: "Djibouti", lat: 11.8251, lon: 42.5903, image: "images/djibouti.png" },
    { name: "Dominica", lat: 15.4150, lon: -61.3710, image: "images/dominica.png" },
    { name: "Dominican Republic", lat: 18.7357, lon: -70.1627, image: "images/dominican_republic.png" },
    { name: "Ecuador", lat: -1.8312, lon: -78.1834, image: "images/ecuador.png" },
    { name: "Egypt", lat: 26.8206, lon: 30.8025, image: "images/egypt.png" },
    { name: "El Salvador", lat: 13.7942, lon: -88.8965, image: "images/el_salvador.png" },
    { name: "Equatorial Guinea", lat: 1.6508, lon: 10.2679, image: "images/equatorial_guinea.png" },
    { name: "Eritrea", lat: 15.1794, lon: 39.7823, image: "images/eritrea.png" },
    { name: "Estonia", lat: 58.5953, lon: 25.0136, image: "images/estonia.png" },
    { name: "Eswatini", lat: -26.5225, lon: 31.4659, image: "images/eswatini.png" },
    { name: "Ethiopia", lat: 9.1450, lon: 40.4897, image: "images/ethiopia.png" },
    { name: "Fiji", lat: -17.7134, lon: 178.0650, image: "images/fiji.png" },
    { name: "Finland", lat: 61.9241, lon: 25.7482, image: "images/finland.png" },
    { name: "France", lat: 46.6034, lon: 1.8883, image: "images/france.png" }
];

let paisSecreto, intentos, juegoTerminado;
const maxIntentos = 5;
let historialPartidas = [];

// Inicializa el juego
function iniciarJuego() {
    paisSecreto = paises[Math.floor(Math.random() * paises.length)];
    intentos = 0;
    juegoTerminado = false;
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

// Calcula la distancia en un mapa plano (proyección planisférica)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const escala = 111; // Aproximadamente 111 km por grado de latitud o longitud
    const dx = (lon2 - lon1) * escala;
    const dy = (lat2 - lat1) * escala;
    
    return Math.sqrt(dx * dx + dy * dy); // Distancia euclidiana en el mapa plano
}

// Calcula la dirección relativa con ajuste de 20° en N, S, E, O
function calcularDireccion(lat1, lon1, lat2, lon2) {
    const dx = lon2 - lon1;
    const dy = lat2 - lat1;

    // Calcula el ángulo en grados
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    if ((angle >= -20 && angle <= 20) || (angle >= 160 && angle <= 200)) return "E";
    if ((angle >= 70 && angle <= 110) || (angle >= 250 && angle <= 290)) return "N";
    if ((angle >= -110 && angle <= -70) || (angle >= 110 && angle <= 160)) return "O";
    if ((angle >= -290 && angle <= -250) || (angle >= -70 && angle <= -20)) return "S";

    if (angle > 0 && angle < 70) return "NE";
    if (angle > 110 && angle < 160) return "NO";
    if (angle < -110 && angle > -160) return "SO";
    if (angle < -70 && angle > -20) return "SE";

    return "N"; // Default si no entra en ninguna
}

// Verifica la respuesta del usuario
function verificarRespuesta() {
    if (juegoTerminado) return;

    const guess = document.getElementById("guess").value.trim();
    const paisElegido = paises.find(p => p.name.toLowerCase() === guess.toLowerCase());

    if (!paisElegido) {
        document.getElementById("feedback").innerText = "País no válido, intenta de nuevo.";
        return;
    }

    intentos++;

    if (paisElegido.name === paisSecreto.name) {
        document.getElementById("feedback").innerText = `🎉 ¡Correcto! Adivinaste en ${intentos} intentos.`;
        juegoTerminado = true;
        return;
    }

    const distancia = calcularDistancia(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);
    const direccion = calcularDireccion(paisElegido.lat, paisElegido.lon, paisSecreto.lat, paisSecreto.lon);

    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${paisElegido.name}</td><td>${Math.round(distancia)} km</td><td>${direccion}</td>`;
    document.getElementById("tabla-intentos").appendChild(fila);

    if (intentos >= maxIntentos) {
        document.getElementById("feedback").innerText = `❌ GAME OVER. El país secreto era ${paisSecreto.name}.`;
        juegoTerminado = true;
    } else {
        document.getElementById("feedback").innerText = `📍 El país secreto está a ${Math.round(distancia)} km al ${direccion} de ${paisElegido.name}. Intento ${intentos}/${maxIntentos}.`;
    }

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
