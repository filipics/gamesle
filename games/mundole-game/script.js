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
    { name: "Czech Republic", lat: 49.8175, lon: 15.4720, image: "images/czech_republic.png" },
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
    { name: "France", lat: 46.6034, lon: 1.8883, image: "images/france.png" },
    { name: "Gabon", lat: -0.8037, lon: 11.6094, image: "images/gabon.png" },
    { name: "Gambia", lat: 13.4432, lon: -15.3101, image: "images/gambia.png" },
    { name: "Georgia", lat: 42.3154, lon: 43.3569, image: "images/georgia.png" },
    { name: "Germany", lat: 51.1657, lon: 10.4515, image: "images/germany.png" },
    { name: "Ghana", lat: 7.9465, lon: -1.0232, image: "images/ghana.png" },
    { name: "Greece", lat: 39.0742, lon: 21.8243, image: "images/greece.png" },
    { name: "Grenada", lat: 12.1165, lon: -61.679, image: "images/grenada.png" },
    { name: "Guatemala", lat: 15.7835, lon: -90.2308, image: "images/guatemala.png" },
    { name: "Guinea", lat: 9.9456, lon: -9.6966, image: "images/guinea.png" },
    { name: "Guinea-Bissau", lat: 11.8037, lon: -15.1804, image: "images/guinea-bissau.png" },
    { name: "Guyana", lat: 4.8604, lon: -58.9302, image: "images/guyana.png" },
    { name: "Haiti", lat: 18.9712, lon: -72.2852, image: "images/haiti.png" },
    { name: "Honduras", lat: 15.1999, lon: -86.2419, image: "images/honduras.png" },
    { name: "Hungary", lat: 47.1625, lon: 19.5033, image: "images/hungary.png" },
    { name: "Iceland", lat: 64.9631, lon: -19.0208, image: "images/iceland.png" },
    { name: "India", lat: 20.5937, lon: 78.9629, image: "images/india.png" },
    { name: "Indonesia", lat: -0.7893, lon: 113.9213, image: "images/indonesia.png" },
    { name: "Iran", lat: 32.4279, lon: 53.688, image: "images/iran.png" },
    { name: "Iraq", lat: 33.2232, lon: 43.6793, image: "images/iraq.png" },
    { name: "Ireland", lat: 53.1424, lon: -7.6921, image: "images/ireland.png" },
    { name: "Israel", lat: 31.0461, lon: 34.8516, image: "images/israel.png" },
    { name: "Italy", lat: 41.8719, lon: 12.5674, image: "images/italy.png" },
    { name: "Jamaica", lat: 18.1096, lon: -77.2975, image: "images/jamaica.png" },
    { name: "Japan", lat: 36.2048, lon: 138.2529, image: "images/japan.png" },
    { name: "Jordan", lat: 30.5852, lon: 36.2384, image: "images/jordan.png" },
    { name: "Kazakhstan", lat: 48.0196, lon: 66.9237, image: "images/kazakhstan.png" },
    { name: "Kenya", lat: -1.286389, lon: 36.817223, image: "images/kenya.png" },
    { name: "Kiribati", lat: -3.3704, lon: -168.734, image: "images/kiribati.png" },
    { name: "Kuwait", lat: 29.3117, lon: 47.4818, image: "images/kuwait.png" },
    { name: "Kyrgyzstan", lat: 41.2044, lon: 74.7661, image: "images/kyrgyzstan.png" },
    { name: "Laos", lat: 19.8563, lon: 102.4955, image: "images/laos.png" },
    { name: "Latvia", lat: 56.8796, lon: 24.6032, image: "images/latvia.png" },
    { name: "Lebanon", lat: 33.8547, lon: 35.8623, image: "images/lebanon.png" },
    { name: "Lesotho", lat: -29.6099, lon: 28.2336, image: "images/lesotho.png" },
    { name: "Liberia", lat: 6.4281, lon: -9.4295, image: "images/liberia.png" },
    { name: "Libya", lat: 26.3351, lon: 17.2283, image: "images/libya.png" },
    { name: "Liechtenstein", lat: 47.166, lon: 9.5554, image: "images/liechtenstein.png" },
    { name: "Lithuania", lat: 55.1694, lon: 23.8813, image: "images/lithuania.png" },
    { name: "Luxembourg", lat: 49.8153, lon: 6.1296, image: "images/luxembourg.png" },
    { name: "Madagascar", lat: -18.7669, lon: 46.8691, image: "images/madagascar.png" },
    { name: "Malawi", lat: -13.2543, lon: 34.3015, image: "images/malawi.png" },
    { name: "Malaysia", lat: 4.2105, lon: 101.9758, image: "images/malaysia.png" },
    { name: "Maldives", lat: 3.2028, lon: 73.2207, image: "images/maldives.png" },
    { name: "Mali", lat: 17.5707, lon: -3.9962, image: "images/mali.png" },
    { name: "Malta", lat: 35.9375, lon: 14.3754, image: "images/malta.png" },
    { name: "Marshall Islands", lat: 7.1315, lon: 171.1845, image: "images/marshall_islands.png" },
    { name: "Mauritania", lat: 21.0079, lon: -10.9408, image: "images/mauritania.png" },
    { name: "Mauritius", lat: -20.3484, lon: 57.5522, image: "images/mauritius.png" },
    { name: "Mexico", lat: 23.6345, lon: -102.5528, image: "images/mexico.png" },
    { name: "Micronesia", lat: 7.4256, lon: 150.5508, image: "images/micronesia.png" },
    { name: "Moldova", lat: 47.4116, lon: 28.3699, image: "images/moldova.png" },
    { name: "Monaco", lat: 43.7333, lon: 7.4167, image: "images/monaco.png" },
    { name: "Mongolia", lat: 46.8625, lon: 103.8467, image: "images/mongolia.png" },
    { name: "Montenegro", lat: 42.7087, lon: 19.3744, image: "images/montenegro.png" },
    { name: "Morocco", lat: 31.7917, lon: -7.0926, image: "images/morocco.png" },
    { name: "Mozambique", lat: -18.6657, lon: 35.5296, image: "images/mozambique.png" },
    { name: "Myanmar", lat: 21.9162, lon: 95.956, image: "images/myanmar.png" },
    { name: "Namibia", lat: -22.9576, lon: 18.4904, image: "images/namibia.png" },
    { name: "Nauru", lat: -0.5228, lon: 166.9315, image: "images/nauru.png" },
    { name: "Nepal", lat: 28.3949, lon: 84.124, image: "images/nepal.png" },
    { name: "Netherlands", lat: 52.1326, lon: 5.2913, image: "images/netherlands.png" },
    { name: "New Zealand", lat: -40.9006, lon: 174.886, image: "images/new_zealand.png" },
    { name: "Nicaragua", lat: 12.8654, lon: -85.2072, image: "images/nicaragua.png" },
    { name: "Niger", lat: 17.6078, lon: 8.0817, image: "images/niger.png" },
    { name: "Nigeria", lat: 9.082, lon: 8.6753, image: "images/nigeria.png" },
    { name: "North Korea", lat: 40.3399, lon: 127.5101, image: "images/north_korea.png" },
    { name: "North Macedonia", lat: 41.6086, lon: 21.7453, image: "images/north_macedonia.png" },
    { name: "Norway", lat: 60.472, lon: 8.4689, image: "images/norway.png" },
    { name: "Oman", lat: 21.4735, lon: 55.9754, image: "images/oman.png" },
    { name: "Pakistan", lat: 30.3753, lon: 69.3451, image: "images/pakistan.png" },
    { name: "Palau", lat: 7.515, lon: 134.5825, image: "images/palau.png" },
    { name: "Palestine", lat: 31.9522, lon: 35.2332, image: "images/palestine.png" },
    { name: "Panama", lat: 8.5379, lon: -80.7821, image: "images/panama.png" },
    { name: "Papua New Guinea", lat: -6.314993, lon: 143.95555, image: "images/papua_new_guinea.png" },
    { name: "Paraguay", lat: -23.4425, lon: -58.4438, image: "images/paraguay.png" },
    { name: "Peru", lat: -9.19, lon: -75.0152, image: "images/peru.png" },
    { name: "Philippines", lat: 12.8797, lon: 121.774, image: "images/philippines.png" },
    { name: "Poland", lat: 51.9194, lon: 19.1451, image: "images/poland.png" },
    { name: "Portugal", lat: 39.3999, lon: -8.2245, image: "images/portugal.png" },
    { name: "Qatar", lat: 25.3548, lon: 51.1839, image: "images/qatar.png" },
    { name: "Romania", lat: 45.9432, lon: 24.9668, image: "images/romania.png" },
    { name: "Russia", lat: 61.524, lon: 105.3188, image: "images/russia.png" },
    { name: "Rwanda", lat: -1.9403, lon: 29.8739, image: "images/rwanda.png" },
    { name: "Saint Kitts and Nevis", lat: 17.3578, lon: -62.7824, image: "images/saint_kitts_and_nevis.png" },
    { name: "Saint Lucia", lat: 13.9094, lon: -60.9789, image: "images/saint_lucia.png" },
    { name: "Saint Vincent and the Grenadines", lat: 12.9843, lon: -61.2872, image: "images/saint_vincent_and_the_grenadines.png" },
    { name: "Samoa", lat: -13.759, lon: -172.1046, image: "images/samoa.png" },
    { name: "San Marino", lat: 43.9333, lon: 12.45, image: "images/san_marino.png" },
    { name: "Sao Tome and Principe", lat: 0.1864, lon: 6.6131, image: "images/sao_tome_and_principe.png" },
    { name: "Saudi Arabia", lat: 23.8859, lon: 45.0792, image: "images/saudi_arabia.png" },
    { name: "Senegal", lat: 14.4974, lon: -14.4524, image: "images/senegal.png" },
    { name: "Serbia", lat: 44.0165, lon: 21.0059, image: "images/serbia.png" },
    { name: "Seychelles", lat: -4.6796, lon: 55.492, image: "images/seychelles.png" },
    { name: "Sierra Leone", lat: 8.4606, lon: -11.7799, image: "images/sierra_leone.png" },
    { name: "Singapore", lat: 1.3521, lon: 103.8198, image: "images/singapore.png" },
    { name: "Slovakia", lat: 48.669, lon: 19.699, image: "images/slovakia.png" },
    { name: "Slovenia", lat: 46.1512, lon: 14.9955, image: "images/slovenia.png" },
    { name: "Solomon Islands", lat: -9.6457, lon: 160.1562, image: "images/solomon_islands.png" },
    { name: "Somalia", lat: 5.1521, lon: 46.1996, image: "images/somalia.png" },
    { name: "South Africa", lat: -30.5595, lon: 22.9375, image: "images/south_africa.png" },
    { name: "South Korea", lat: 35.9078, lon: 127.7669, image: "images/south_korea.png" },
    { name: "South Sudan", lat: 6.877, lon: 31.307, image: "images/south_sudan.png" },
    { name: "Spain", lat: 40.4637, lon: -3.7492, image: "images/spain.png" },
    { name: "Sri Lanka", lat: 7.8731, lon: 80.7718, image: "images/sri_lanka.png" },
    { name: "Sudan", lat: 12.8628, lon: 30.2176, image: "images/sudan.png" },
    { name: "Suriname", lat: 3.9193, lon: -56.0278, image: "images/suriname.png" },
    { name: "Sweden", lat: 60.1282, lon: 18.6435, image: "images/sweden.png" },
    { name: "Switzerland", lat: 46.8182, lon: 8.2275, image: "images/switzerland.png" },
    { name: "Syria", lat: 34.8021, lon: 38.9968, image: "images/syria.png" },
    { name: "Tajikistan", lat: 38.861, lon: 71.2761, image: "images/tajikistan.png" },
    { name: "Tanzania", lat: -6.369, lon: 34.8888, image: "images/tanzania.png" },
    { name: "Thailand", lat: 15.87, lon: 100.9925, image: "images/thailand.png" },
    { name: "Timor-Leste", lat: -8.8742, lon: 125.7275, image: "images/timor-leste.png" },
    { name: "Togo", lat: 8.6195, lon: 0.8248, image: "images/togo.png" },
    { name: "Tonga", lat: -21.1789, lon: -175.1982, image: "images/tonga.png" },
    { name: "Trinidad and Tobago", lat: 10.6918, lon: -61.2225, image: "images/trinidad_and_tobago.png" },
    { name: "Tunisia", lat: 33.8869, lon: 9.5375, image: "images/tunisia.png" },
    { name: "Turkey", lat: 38.9637, lon: 35.2433, image: "images/turkey.png" },
    { name: "Turkmenistan", lat: 38.9697, lon: 59.5563, image: "images/turkmenistan.png" },
    { name: "Tuvalu", lat: -7.1095, lon: 177.6493, image: "images/tuvalu.png" },
    { name: "Uganda", lat: 1.3733, lon: 32.2903, image: "images/uganda.png" },
    { name: "Ukraine", lat: 48.3794, lon: 31.1656, image: "images/ukraine.png" },
    { name: "United Arab Emirates", lat: 23.4241, lon: 53.8478, image: "images/united_arab_emirates.png" },
    { name: "United Kingdom", lat: 55.3781, lon: -3.436, image: "images/united_kingdom.png" },
    { name: "United States", lat: 37.0902, lon: -95.7129, image: "images/united_states.png" },
    { name: "Uruguay", lat: -32.5228, lon: -55.7658, image: "images/uruguay.png" },
    { name: "Uzbekistan", lat: 41.3775, lon: 64.5853, image: "images/uzbekistan.png" },
    { name: "Vanuatu", lat: -15.3767, lon: 166.9592, image: "images/vanuatu.png" },
    { name: "Vatican City", lat: 41.9029, lon: 12.4534, image: "images/vatican_city.png" },
    { name: "Venezuela", lat: 6.4238, lon: -66.5897, image: "images/venezuela.png" },
    { name: "Vietnam", lat: 14.0583, lon: 108.2772, image: "images/vietnam.png" },
    { name: "Yemen", lat: 15.5527, lon: 48.5164, image: "images/yemen.png" },
    { name: "Zambia", lat: -13.1339, lon: 27.8493, image: "images/zambia.png" },
    { name: "Zimbabwe", lat: -19.0154, lon: 29.1549, image: "images/zimbabwe.png" },
    
];

let intentos, juegoTerminado;
const maxIntentos = 5;
let historialPartidas = [];

function elegirPaisSecreto() {
    let paisConImagen;
    do {
        paisConImagen = paises[Math.floor(Math.random() * paises.length)];
    } while (!imagenExiste(paisConImagen.image)); // Verificar que la imagen existe

    return paisConImagen;
}

// Función para verificar si la imagen existe
function imagenExiste(url) {
    let img = new Image();
    img.src = url;
    return img.complete || img.width !== 0; 
}

// Seleccionar un país asegurándose de que tenga imagen
let paisSecreto = elegirPaisSecreto();
document.getElementById("country-image").src = paisSecreto.image;

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
