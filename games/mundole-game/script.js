// Lista de países con coordenadas e imágenes
const paises = [
   { name: "Afganistán", lat: 33.9391, lon: 67.7100, image: "images/afghanistan.png" },
{ name: "Albania", lat: 41.1533, lon: 20.1683, image: "images/albania.png" },
{ name: "Samoa Americana", lat: -14.2710, lon: -170.1322, image: "images/american_samoa.png" },
{ name: "Anguilla", lat: 18.2206, lon: -63.0686, image: "images/anguilla.png" },
{ name: "Antártida", lat: -82.8628, lon: 135.0000, image: "images/antarctica.png" },
{ name: "Aruba", lat: 12.5211, lon: -70.0187, image: "images/aruba.png" },
{ name: "Bermuda", lat: 32.3078, lon: -64.7505, image: "images/bermuda.png" },
{ name: "Argelia", lat: 28.0339, lon: 1.6596, image: "images/algeria.png" },
{ name: "Andorra", lat: 42.5078, lon: 1.5218, image: "images/andorra.png" },
{ name: "Angola", lat: -11.2027, lon: 17.8739, image: "images/angola.png" },
{ name: "Antigua y Barbuda", lat: 17.0608, lon: -61.7964, image: "images/antigua_and_barbuda.png" },
{ name: "Argentina", lat: -38.4161, lon: -63.6167, image: "images/argentina.png" },
{ name: "Armenia", lat: 40.0691, lon: 45.0382, image: "images/armenia.png" },
{ name: "Australia", lat: -25.2744, lon: 133.7751, image: "images/australia.png" },
{ name: "Austria", lat: 47.5162, lon: 14.5501, image: "images/austria.png" },
{ name: "Azerbaiyán", lat: 40.1431, lon: 47.5769, image: "images/azerbaijan.png" },
{ name: "Bahamas", lat: 25.0343, lon: -77.3963, image: "images/bahamas.png" },
{ name: "Baréin", lat: 26.0667, lon: 50.5577, image: "images/bahrain.png" },
{ name: "Bangladés", lat: 23.6850, lon: 90.3563, image: "images/bangladesh.png" },
{ name: "Barbados", lat: 13.1939, lon: -59.5432, image: "images/barbados.png" },
{ name: "Bielorrusia", lat: 53.9006, lon: 27.5590, image: "images/belarus.png" },
{ name: "Bélgica", lat: 50.8503, lon: 4.3517, image: "images/belgium.png" },
{ name: "Belice", lat: 17.1899, lon: -88.4976, image: "images/belize.png" },
{ name: "Benín", lat: 9.3077, lon: 2.3158, image: "images/benin.png" },
{ name: "Bután", lat: 27.5142, lon: 90.4336, image: "images/bhutan.png" },
{ name: "Bolivia", lat: -16.2902, lon: -63.5887, image: "images/bolivia.png" },
{ name: "Bosnia y Herzegovina", lat: 43.9159, lon: 17.6791, image: "images/bosnia_and_herzegovina.png" },
{ name: "Botsuana", lat: -22.3285, lon: 24.6849, image: "images/botswana.png" },
{ name: "Brasil", lat: -14.2350, lon: -51.9253, image: "images/brazil.png" },
{ name: "Brunéi", lat: 4.5353, lon: 114.7277, image: "images/brunei.png" },
{ name: "Bulgaria", lat: 42.7339, lon: 25.4858, image: "images/bulgaria.png" },
{ name: "Burkina Faso", lat: 12.2383, lon: -1.5616, image: "images/burkina_faso.png" },
{ name: "Burundi", lat: -3.3731, lon: 29.9189, image: "images/burundi.png" },
{ name: "Cabo Verde", lat: 16.5388, lon: -23.0418, image: "images/cabo_verde.png" },
{ name: "Camboya", lat: 12.5657, lon: 104.9910, image: "images/cambodia.png" },
{ name: "Camerún", lat: 7.3697, lon: 12.3547, image: "images/cameroon.png" },
{ name: "Canadá", lat: 56.1304, lon: -106.3468, image: "images/canada.png" },
{ name: "República Centroafricana", lat: 6.6111, lon: 20.9394, image: "images/central_african_republic.png" },
{ name: "Chad", lat: 15.4542, lon: 18.7322, image: "images/chad.png" },
{ name: "Chile", lat: -35.6751, lon: -71.5430, image: "images/chile.png" },
{ name: "China", lat: 35.8617, lon: 104.1954, image: "images/china.png" },
{ name: "Colombia", lat: 4.5709, lon: -74.2973, image: "images/colombia.png" },
{ name: "Comoras", lat: -11.6455, lon: 43.3333, image: "images/comoros.png" },
{ name: "Congo (Congo-Brazzaville)", lat: -0.2280, lon: 15.8277, image: "images/congo_(congo-brazzaville).png" },
{ name: "Costa Rica", lat: 9.7489, lon: -83.7534, image: "images/costa_rica.png" },
{ name: "Croacia", lat: 45.1000, lon: 15.2000, image: "images/croatia.png" },
{ name: "Cuba", lat: 21.5218, lon: -77.7812, image: "images/cuba.png" },
{ name: "Chipre", lat: 35.1264, lon: 33.4299, image: "images/cyprus.png" },
{ name: "República Checa", lat: 49.8175, lon: 15.4720, image: "images/czech_republic.png" },
{ name: "República Democrática del Congo", lat: -4.0383, lon: 21.7587, image: "images/democratic_republic_of_the_congo.png" },
{ name: "Dinamarca", lat: 56.2639, lon: 9.5018, image: "images/denmark.png" },
{ name: "Yibuti", lat: 11.8251, lon: 42.5903, image: "images/djibouti.png" },
{ name: "Dominica", lat: 15.4150, lon: -61.3710, image: "images/dominica.png" },
{ name: "República Dominicana", lat: 18.7357, lon: -70.1627, image: "images/dominican_republic.png" },
{ name: "Ecuador", lat: -1.8312, lon: -78.1834, image: "images/ecuador.png" },
{ name: "Egipto", lat: 26.8206, lon: 30.8025, image: "images/egypt.png" },
{ name: "El Salvador", lat: 13.7942, lon: -88.8965, image: "images/el_salvador.png" },
{ name: "Guinea Ecuatorial", lat: 1.6508, lon: 10.2679, image: "images/equatorial_guinea.png" },
{ name: "Eritrea", lat: 15.1794, lon: 39.7823, image: "images/eritrea.png" },
{ name: "Estonia", lat: 58.5953, lon: 25.0136, image: "images/estonia.png" },
{ name: "Esuatini", lat: -26.5225, lon: 31.4659, image: "images/eswatini.png" },
{ name: "Etiopía", lat: 9.1450, lon: 40.4897, image: "images/ethiopia.png" },
{ name: "Fiyi", lat: -17.7134, lon: 178.0650, image: "images/fiji.png" },
{ name: "Finlandia", lat: 61.9241, lon: 25.7482, image: "images/finland.png" },
{ name: "Francia", lat: 46.6034, lon: 1.8883, image: "images/france.png" },
{ name: "Gabón", lat: -0.8037, lon: 11.6094, image: "images/gabon.png" },
{ name: "Gambia", lat: 13.4432, lon: -15.3101, image: "images/gambia.png" },
{ name: "Georgia", lat: 42.3154, lon: 43.3569, image: "images/georgia.png" },
{ name: "Alemania", lat: 51.1657, lon: 10.4515, image: "images/germany.png" },
{ name: "Ghana", lat: 7.9465, lon: -1.0232, image: "images/ghana.png" },
{ name: "Grecia", lat: 39.0742, lon: 21.8243, image: "images/greece.png" },
{ name: "Granada", lat: 12.1165, lon: -61.679, image: "images/grenada.png" },
{ name: "Guatemala", lat: 15.7835, lon: -90.2308, image: "images/guatemala.png" },
{ name: "Guinea", lat: 9.9456, lon: -9.6966, image: "images/guinea.png" },
{ name: "Guinea-Bisáu", lat: 11.8037, lon: -15.1804, image: "images/guinea-bissau.png" },
{ name: "Guyana", lat: 4.8604, lon: -58.9302, image: "images/guyana.png" },
{ name: "Haití", lat: 18.9712, lon: -72.2852, image: "images/haiti.png" },
{ name: "Honduras", lat: 15.1999, lon: -86.2419, image: "images/honduras.png" },
{ name: "Hungría", lat: 47.1625, lon: 19.5033, image: "images/hungary.png" },
{ name: "Islandia", lat: 64.9631, lon: -19.0208, image: "images/iceland.png" },
{ name: "India", lat: 20.5937, lon: 78.9629, image: "images/india.png" },
{ name: "Indonesia", lat: -0.7893, lon: 113.9213, image: "images/indonesia.png" },
{ name: "Irán", lat: 32.4279, lon: 53.688, image: "images/iran.png" },
{ name: "Irak", lat: 33.2232, lon: 43.6793, image: "images/iraq.png" },
{ name: "Irlanda", lat: 53.1424, lon: -7.6921, image: "images/ireland.png" },
{ name: "Israel", lat: 31.0461, lon: 34.8516, image: "images/israel.png" },
{ name: "Italia", lat: 41.8719, lon: 12.5674, image: "images/italy.png" },
{ name: "Jamaica", lat: 18.1096, lon: -77.2975, image: "images/jamaica.png" },
{ name: "Japón", lat: 36.2048, lon: 138.2529, image: "images/japan.png" },
{ name: "Jordania", lat: 30.5852, lon: 36.2384, image: "images/jordan.png" },
{ name: "Kazajistán", lat: 48.0196, lon: 66.9237, image: "images/kazakhstan.png" },
{ name: "Kenia", lat: -1.286389, lon: 36.817223, image: "images/kenya.png" },
{ name: "Kiribati", lat: -3.3704, lon: -168.734, image: "images/kiribati.png" },
{ name: "Kuwait", lat: 29.3117, lon: 47.4818, image: "images/kuwait.png" },
{ name: "Kirguistán", lat: 41.2044, lon: 74.7661, image: "images/kyrgyzstan.png" },
{ name: "Laos", lat: 19.8563, lon: 102.4955, image: "images/laos.png" },
{ name: "Letonia", lat: 56.8796, lon: 24.6032, image: "images/latvia.png" },
{ name: "Líbano", lat: 33.8547, lon: 35.8623, image: "images/lebanon.png" },
{ name: "Lesoto", lat: -29.6099, lon: 28.2336, image: "images/lesotho.png" },
{ name: "Liberia", lat: 6.4281, lon: -9.4295, image: "images/liberia.png" },
{ name: "Libia", lat: 26.3351, lon: 17.2283, image: "images/libya.png" },
{ name: "Liechtenstein", lat: 47.166, lon: 9.5554, image: "images/liechtenstein.png" },
{ name: "Lituania", lat: 55.1694, lon: 23.8813, image: "images/lithuania.png" },
{ name: "Luxemburgo", lat: 49.8153, lon: 6.1296, image: "images/luxembourg.png" },
{ name: "Madagascar", lat: -18.7669, lon: 46.8691, image: "images/madagascar.png" },
{ name: "Malaui", lat: -13.2543, lon: 34.3015, image: "images/malawi.png" },
{ name: "Malasia", lat: 4.2105, lon: 101.9758, image: "images/malaysia.png" },
{ name: "Maldivas", lat: 3.2028, lon: 73.2207, image: "images/maldives.png" },
{ name: "Mali", lat: 17.5707, lon: -3.9962, image: "images/mali.png" },
{ name: "Malta", lat: 35.9375, lon: 14.3754, image: "images/malta.png" },
{ name: "México", lat: 23.6345, lon: -102.5528, image: "images/mexico.png" },
{ name: "Mónaco", lat: 43.7333, lon: 7.4167, image: "images/monaco.png" },
{ name: "Mongolia", lat: 46.8625, lon: 103.8467, image: "images/mongolia.png" },
{ name: "Montenegro", lat: 42.7087, lon: 19.3744, image: "images/montenegro.png" },
{ name: "Marruecos", lat: 31.7917, lon: -7.0926, image: "images/morocco.png" },
{ name: "Mozambique", lat: -18.6657, lon: 35.5296, image: "images/mozambique.png" },
{ name: "Myanmar", lat: 21.9162, lon: 95.956, image: "images/myanmar.png" },
{ name: "Namibia", lat: -22.9576, lon: 18.4904, image: "images/namibia.png" },
{ name: "Nauru", lat: -0.5228, lon: 166.9315, image: "images/nauru.png" },
{ name: "Nepal", lat: 28.3949, lon: 84.124, image: "images/nepal.png" },
{ name: "Países Bajos", lat: 52.1326, lon: 5.2913, image: "images/netherlands.png" },
{ name: "Nueva Zelanda", lat: -40.9006, lon: 174.886, image: "images/new_zealand.png" },
{ name: "Nicaragua", lat: 12.8654, lon: -85.2072, image: "images/nicaragua.png" },
{ name: "Níger", lat: 17.6078, lon: 8.0817, image: "images/niger.png" },
{ name: "Nigeria", lat: 9.082, lon: 8.6753, image: "images/nigeria.png" },
{ name: "Corea del Norte", lat: 40.3399, lon: 127.5101, image: "images/north_korea.png" },
{ name: "Macedonia del Norte", lat: 41.6086, lon: 21.7453, image: "images/north_macedonia.png" },
{ name: "Noruega", lat: 60.472, lon: 8.4689, image: "images/norway.png" },
{ name: "Omán", lat: 21.4735, lon: 55.9754, image: "images/oman.png" },
{ name: "Pakistán", lat: 30.3753, lon: 69.3451, image: "images/pakistan.png" },
{ name: "Palaos", lat: 7.515, lon: 134.5825, image: "images/palau.png" },
{ name: "Palestina", lat: 31.9522, lon: 35.2332, image: "images/palestine.png" },
{ name: "Panamá", lat: 8.5379, lon: -80.7821, image: "images/panama.png" },
{ name: "Papúa Nueva Guinea", lat: -6.314993, lon: 143.95555, image: "images/papua_new_guinea.png" },
{ name: "Paraguay", lat: -23.4425, lon: -58.4438, image: "images/paraguay.png" },
{ name: "Perú", lat: -9.19, lon: -75.0152, image: "images/peru.png" },
{ name: "Filipinas", lat: 12.8797, lon: 121.774, image: "images/philippines.png" },
{ name: "Polonia", lat: 51.9194, lon: 19.1451, image: "images/poland.png" },
{ name: "Portugal", lat: 39.3999, lon: -8.2245, image: "images/portugal.png" },
{ name: "Catar", lat: 25.3548, lon: 51.1839, image: "images/qatar.png" },
{ name: "Rumania", lat: 45.9432, lon: 24.9668, image: "images/romania.png" },
{ name: "Rusia", lat: 61.524, lon: 105.3188, image: "images/russia.png" },
{ name: "Ruanda", lat: -1.9403, lon: 29.8739, image: "images/rwanda.png" },
{ name: "Santa Lucía", lat: 13.9094, lon: -60.9789, image: "images/saint_lucia.png" },
{ name: "San Vicente y las Granadinas", lat: 12.9843, lon: -61.2872, image: "images/saint_vincent_and_the_grenadines.png" },
{ name: "Samoa", lat: -13.759, lon: -172.1046, image: "images/samoa.png" },
{ name: "San Marino", lat: 43.9333, lon: 12.45, image: "images/san_marino.png" },
{ name: "Santo Tomé y Príncipe", lat: 0.1864, lon: 6.6131, image: "images/sao_tome_and_principe.png" },
{ name: "Arabia Saudita", lat: 23.8859, lon: 45.0792, image: "images/saudi_arabia.png" },
{ name: "Senegal", lat: 14.4974, lon: -14.4524, image: "images/senegal.png" },
{ name: "Serbia", lat: 44.0165, lon: 21.0059, image: "images/serbia.png" },
{ name: "Seychelles", lat: -4.6796, lon: 55.492, image: "images/seychelles.png" },
{ name: "Sierra Leona", lat: 8.4606, lon: -11.7799, image: "images/sierra_leone.png" },
{ name: "Singapur", lat: 1.3521, lon: 103.8198, image: "images/singapore.png" },
{ name: "Eslovaquia", lat: 48.669, lon: 19.699, image: "images/slovakia.png" },
{ name: "Eslovenia", lat: 46.1512, lon: 14.9955, image: "images/slovenia.png" },
{ name: "Islas Salomón", lat: -9.6457, lon: 160.1562, image: "images/solomon_islands.png" },
{ name: "Somalia", lat: 5.1521, lon: 46.1996, image: "images/somalia.png" },
{ name: "Sudáfrica", lat: -30.5595, lon: 22.9375, image: "images/south_africa.png" },
{ name: "Corea del Sur", lat: 35.9078, lon: 127.7669, image: "images/south_korea.png" },
{ name: "Sudán del Sur", lat: 6.877, lon: 31.307, image: "images/south_sudan.png" },
{ name: "España", lat: 40.4637, lon: -3.7492, image: "images/spain.png" },
{ name: "Sri Lanka", lat: 7.8731, lon: 80.7718, image: "images/sri_lanka.png" },
{ name: "Sudán", lat: 12.8628, lon: 30.2176, image: "images/sudan.png" },
{ name: "Surinam", lat: 3.9193, lon: -56.0278, image: "images/suriname.png" },
{ name: "Suecia", lat: 60.1282, lon: 18.6435, image: "images/sweden.png" },
{ name: "Suiza", lat: 46.8182, lon: 8.2275, image: "images/switzerland.png" },
{ name: "Siria", lat: 34.8021, lon: 38.9968, image: "images/syria.png" },
{ name: "Tayikistán", lat: 38.861, lon: 71.2761, image: "images/tajikistan.png" },
{ name: "Tanzania", lat: -6.369, lon: 34.8888, image: "images/tanzania.png" },
{ name: "Tailandia", lat: 15.87, lon: 100.9925, image: "images/thailand.png" },
{ name: "Timor Oriental", lat: -8.8742, lon: 125.7275, image: "images/timor-leste.png" },
{ name: "Togo", lat: 8.6195, lon: 0.8248, image: "images/togo.png" },
{ name: "Tonga", lat: -21.1789, lon: -175.1982, image: "images/tonga.png" },
{ name: "Trinidad y Tobago", lat: 10.6918, lon: -61.2225, image: "images/trinidad_and_tobago.png" },
{ name: "Túnez", lat: 33.8869, lon: 9.5375, image: "images/tunisia.png" },
{ name: "Turquía", lat: 38.9637, lon: 35.2433, image: "images/turkey.png" },
{ name: "Turkmenistán", lat: 38.9697, lon: 59.5563, image: "images/turkmenistan.png" },
{ name: "Tuvalu", lat: -7.1095, lon: 177.6493, image: "images/tuvalu.png" },
{ name: "Uganda", lat: 1.3733, lon: 32.2903, image: "images/uganda.png" },
{ name: "Ucrania", lat: 48.3794, lon: 31.1656, image: "images/ukraine.png" },
{ name: "Emiratos Árabes Unidos", lat: 23.4241, lon: 53.8478, image: "images/united_arab_emirates.png" },
{ name: "Reino Unido", lat: 55.3781, lon: -3.436, image: "images/united_kingdom.png" },
{ name: "Estados Unidos", lat: 37.0902, lon: -95.7129, image: "images/united_states.png" },
{ name: "Uruguay", lat: -32.5228, lon: -55.7658, image: "images/uruguay.png" },
{ name: "Uzbekistán", lat: 41.3775, lon: 64.5853, image: "images/uzbekistan.png" },
{ name: "Vanuatu", lat: -15.3767, lon: 166.9592, image: "images/vanuatu.png" },
{ name: "Ciudad del Vaticano", lat: 41.9029, lon: 12.4534, image: "images/vatican_city.png" },
{ name: "Venezuela", lat: 6.4238, lon: -66.5897, image: "images/venezuela.png" },
{ name: "Vietnam", lat: 14.0583, lon: 108.2772, image: "images/vietnam.png" },
{ name: "Yemen", lat: 15.5527, lon: 48.5164, image: "images/yemen.png" },
{ name: "Zambia", lat: -13.1339, lon: 27.8493, image: "images/zambia.png" },
{ name: "Zimbabue", lat: -19.0154, lon: 29.1549, image: "images/zimbabwe.png" }

    
];
// ==================== Variables Globales ==================== 
const intentosMaximos = 5;
let intentos = 0;
let historialIntentos = [];
let historialPartidas = [];
let paisSecreto;
let isDailyMode = false; // Cambia a true para iniciar en modo diario
let gameOver = false;    // Variable global para saber si el juego terminó



// ==================== Bloquear Entradas ==================== 
function bloquearEntradas() {
  const guessEl = document.getElementById("guess");
  const enviarIntentoEl = document.getElementById("enviar-intento");
  if (guessEl) guessEl.disabled = true;
  if (enviarIntentoEl) enviarIntentoEl.disabled = true;
  gameOver = true;
}

// ==================== Función para generar un hash numérico ==================== 
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// ==================== Estado del Juego Diario (LocalStorage) ==================== 
function loadDailyGameState() {
  const savedState = localStorage.getItem("dailyGameState");
  if (savedState) {
    const state = JSON.parse(savedState);
    // Verificamos que la fecha guardada sea la de hoy
    if (state.lastDailyDate === new Date().toDateString()) {
      intentos = state.intentos;
      historialIntentos = state.historialIntentos;
      paisSecreto = state.paisSecreto;
      const countryImageEl = document.getElementById("country-image");
      if (countryImageEl) countryImageEl.src = paisSecreto.image;
      const feedbackEl = document.getElementById("feedback");
      if (feedbackEl) feedbackEl.textContent = state.feedback || "";
      actualizarHistorialIntentos();
      if (state.gameOver) {
        bloquearEntradas();
      }
      return true;
    }
  }
  return false;
}

function saveDailyGameState() {
  if (isDailyMode) {
    const state = {
      intentos: intentos,
      historialIntentos: historialIntentos,
      paisSecreto: paisSecreto,
      feedback: document.getElementById("feedback") ? document.getElementById("feedback").textContent : "",
      gameOver: document.getElementById("guess")
                  ? (document.getElementById("guess").disabled && document.getElementById("enviar-intento").disabled)
                  : false,
      lastDailyDate: new Date().toDateString()
    };
    localStorage.setItem("dailyGameState", JSON.stringify(state));
  }
}

// ==================== Historial ==================== 
function cargarHistorialPartidas() {
  const partidasGuardadas = localStorage.getItem("historialPartidas");
  if (partidasGuardadas) {
    historialPartidas = JSON.parse(partidasGuardadas);
    actualizarHistorialPartidas();
  }
}
function guardarHistorialPartidas() {
  localStorage.setItem("historialPartidas", JSON.stringify(historialPartidas));
}
function actualizarHistorialPartidas() {
  const listaPartidas = document.getElementById("lista-partidas");
  if (!listaPartidas) return;
  listaPartidas.innerHTML = "";
  historialPartidas.forEach(partida => {
    listaPartidas.innerHTML += `<li class="list-group-item">${partida}</li>`;
  });
}
function actualizarHistorialIntentos() {
  const tablaIntentos = document.getElementById("tabla-intentos");
  if (!tablaIntentos) return;
  tablaIntentos.innerHTML = "";
  historialIntentos.forEach(intent => {
    tablaIntentos.innerHTML += `<tr><td>${intent.nombre}</td><td>${intent.distancia} km</td><td>${intent.direccion}</td></tr>`;
  });
}

// ==================== Verificar si la imagen existe ==================== 
function imagenExiste(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// ==================== Elegir País Secreto ==================== 
async function elegirPaisSecreto() {
  if (isDailyMode) {
    const todayDate = new Date().toDateString();
    const savedDailyCountry = localStorage.getItem("dailyCountry");
    const savedDailyDate = localStorage.getItem("lastDailyDate");
    if (savedDailyCountry && savedDailyDate === todayDate) {
      return JSON.parse(savedDailyCountry);
    } else {
      let index = Math.abs(hashCode(todayDate)) % paises.length;
      let chosenCountry = paises[index];
      localStorage.setItem("dailyCountry", JSON.stringify(chosenCountry));
      localStorage.setItem("lastDailyDate", todayDate);
      return chosenCountry;
    }
  } else {
    let paisConImagen;
    do {
      paisConImagen = paises[Math.floor(Math.random() * paises.length)];
    } while (!(await imagenExiste(paisConImagen.image)));
    return paisConImagen;
  }
}

// ==================== Iniciar Juego ==================== 
async function iniciarJuego() {
  if (!isDailyMode) {
    gameOver = false;
  }
  
  intentos = 0;
  historialIntentos = [];
  actualizarHistorialIntentos();
  
  if (isDailyMode && loadDailyGameState()) {
    // Se cargó el estado diario.
  } else {
    paisSecreto = await elegirPaisSecreto();
    const countryImageEl = document.getElementById("country-image");
    if (countryImageEl) countryImageEl.src = paisSecreto.image;
    const feedbackEl = document.getElementById("feedback");
    if (feedbackEl) feedbackEl.textContent = "";
    const guessEl = document.getElementById("guess");
    if (guessEl) guessEl.value = "";
  }
  const guessEl = document.getElementById("guess");
  if (guessEl) {
    guessEl.placeholder = "Escribe aquí el país";
    guessEl.disabled = false;
  }
  const enviarIntentoEl = document.getElementById("enviar-intento");
  if (enviarIntentoEl) {
    enviarIntentoEl.disabled = false;
  }
  const reiniciarEl = document.getElementById("reiniciar");
  if (reiniciarEl) {
    reiniciarEl.disabled = isDailyMode ? true : false;
  }
}

// ==================== Proyección de Mercator ==================== 
function mercatorProjection(lat, lon) {
  const rad = Math.PI / 180;
  return { x: lon * rad, y: Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2)) };
}

// ==================== Calcular Distancia (Planisferio) ==================== 
function calcularDistanciaPlanisferio(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const p1 = mercatorProjection(lat1, lon1);
  const p2 = mercatorProjection(lat2, lon2);
  const dx = p2.x - p1.x, dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy) * R;
}

// ==================== Calcular Dirección ==================== 
function calcularDireccion(lat1, lon1, lat2, lon2) {
  let dLat = lat1 - lat2;
  let dLon = lon1 - lon2;
  let angulo = Math.atan2(dLon, dLat) * (180 / Math.PI);
  if (angulo < 0) angulo += 360;
  if (angulo >= 350 || angulo < 10) return "S⬇️";
  if (angulo >= 80 && angulo < 100) return "O⬅️";
  if (angulo >= 170 && angulo < 190) return "N⬆️";
  if (angulo >= 260 && angulo < 280) return "E➡️";
  if (angulo >= 10 && angulo < 80) return "SO↙️";
  if (angulo >= 100 && angulo < 170) return "NO↖️";
  if (angulo >= 190 && angulo < 260) return "NE↗️";
  return "SE↘️";
}

// ==================== Mostrar Mapa (NUEVO) ==================== 
// Se usa un iframe de Google Maps para mostrar la ubicación del país secreto.
function showMap() {
  if (!paisSecreto || !paisSecreto.lat || !paisSecreto.lon) return;
  const mapContainer = document.getElementById("map-container");
  if (!mapContainer) return;
  mapContainer.innerHTML = ""; // Limpiar contenido previo
  const iframe = document.createElement("iframe");
  iframe.width = "100%";
  iframe.height = "450";
  iframe.style.border = "0";
  // URL de Google Maps con zoom 6 (ajusta el zoom si lo deseas)
  iframe.src = `https://maps.google.com/maps?q=${paisSecreto.lat},${paisSecreto.lon}&z=6&output=embed`;
  iframe.allowFullscreen = "";
  mapContainer.appendChild(iframe);
}

// ==================== Ocultar Mapa ====================
function hideMap() {
  const mapContainer = document.getElementById("map-container");
  if (mapContainer) {
    mapContainer.innerHTML = "";
  }
}

// ==================== Manejar Intento del Jugador ==================== 
function realizarIntento() {
  if (gameOver) return;
  const guessEl = document.getElementById("guess");
  if (!guessEl) return;
  let paisIntento = guessEl.value.trim();
  if (paisIntento === "") {
    const feedbackEl = document.getElementById("feedback");
    if (feedbackEl) feedbackEl.textContent = "Por favor, ingresa un país.";
    return;
  }
  let paisEncontrado = paises.find(pais => pais.name.toLowerCase() === paisIntento.toLowerCase());
  if (!paisEncontrado) {
    const feedbackEl = document.getElementById("feedback");
    if (feedbackEl) feedbackEl.textContent = "País no encontrado. Intenta de nuevo.";
    return;
  }
  intentos++;
  let distancia = calcularDistanciaPlanisferio(
    paisEncontrado.lat, paisEncontrado.lon, 
    paisSecreto.lat, paisSecreto.lon
  );
  let direccion = calcularDireccion(
    paisEncontrado.lat, paisEncontrado.lon, 
    paisSecreto.lat, paisSecreto.lon
  );
  historialIntentos.push({ 
    nombre: paisIntento, 
    distancia: Math.round(distancia), 
    direccion 
  });
  actualizarHistorialIntentos();
  const feedbackEl = document.getElementById("feedback");
  if (feedbackEl) {
    feedbackEl.textContent = `El país secreto está a ${Math.round(distancia)} km al ${direccion} de ${paisIntento}. Te quedan ${intentosMaximos - intentos} intentos.`;
  }
  guessEl.value = "";
  guessEl.placeholder = "Escribe aquí el país";
  if (isDailyMode) saveDailyGameState();
  if (paisIntento.toLowerCase() === paisSecreto.name.toLowerCase()) {
    if (feedbackEl) {
      feedbackEl.textContent = `¡Correcto! Has encontrado ${paisSecreto.name} en ${intentos} intentos.`;
    }
    historialPartidas.push(`✅ Ganaste en ${intentos} intentos con ${paisSecreto.name}`);
    guardarHistorialPartidas();
    actualizarHistorialPartidas();
    bloquearEntradas();
    if (isDailyMode) saveDailyGameState();
    showMap();  // Mostrar el mapa tras ganar
    return;
  }
  if (intentos >= intentosMaximos) {
    if (feedbackEl) {
      feedbackEl.textContent = `Game Over. El país correcto era ${paisSecreto.name}.`;
    }
    historialPartidas.push(`❌ Perdiste. El país era ${paisSecreto.name}`);
    guardarHistorialPartidas();
    actualizarHistorialPartidas();
    bloquearEntradas();
    if (isDailyMode) saveDailyGameState();
    showMap();  // Mostrar el mapa tras terminar
    return;
  }
}

// ==================== Funciones Auxiliares ==================== 
function showMessage(msg) {
  const msgEl = document.getElementById("message");
  if (!msgEl) return;
  msgEl.innerText = msg;
  setTimeout(() => {
    msgEl.innerText = "";
  }, 2000);
}

function revealWord(text) {
  const revealEl = document.getElementById("reveal-word");
  if (revealEl) revealEl.innerText = text;
}

// ==================== Reiniciar ==================== 
function reiniciarJuego() {
  hideMap(); // Oculta el mapa antes de reiniciar
  if (isDailyMode) {
    const feedbackEl = document.getElementById("feedback");
    if (feedbackEl) feedbackEl.textContent = "El juego diario no se puede reiniciar.";
    return;
  }
  const guessEl = document.getElementById("guess");
  if (guessEl) guessEl.disabled = false;
  const enviarIntentoEl = document.getElementById("enviar-intento");
  if (enviarIntentoEl) enviarIntentoEl.disabled = false;
  iniciarJuego();
}

// ==================== Autocompletar Países ==================== 
const guessInput = document.getElementById("guess");
if (guessInput) {
  guessInput.addEventListener("input", function () {
    let input = this.value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    if (!suggestions) return;
    suggestions.innerHTML = "";
    if (input.length === 0) {
      suggestions.style.display = "none";
      return;
    }
    let coincidencias = paises.filter(pais => pais.name.toLowerCase().startsWith(input));
    coincidencias.forEach(pais => {
      let div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.textContent = pais.name;
      div.onclick = function () {
        guessInput.value = pais.name;
        suggestions.style.display = "none";
      };
      suggestions.appendChild(div);
    });
    suggestions.style.display = coincidencias.length > 0 ? "block" : "none";
  });
}

// ==================== Asignar Eventos a Botones ==================== 
const enviarIntentoBtn = document.getElementById("enviar-intento");
if (enviarIntentoBtn) {
  enviarIntentoBtn.addEventListener("click", realizarIntento);
}
const reiniciarBtn = document.getElementById("reiniciar");
if (reiniciarBtn) {
  reiniciarBtn.addEventListener("click", reiniciarJuego);
}
const modoJuegoBtn = document.getElementById("modo-juego");
if (modoJuegoBtn) {
  modoJuegoBtn.addEventListener("click", function () {
    isDailyMode = !isDailyMode;
    hideMap(); // Oculta el mapa al cambiar de modo
    this.textContent = isDailyMode ? "Modo Diario" : "Modo Normal";
    localStorage.setItem("isDailyModeMundole", isDailyMode.toString());
    iniciarJuego();
  });
}
const shareButton = document.getElementById("share-button");
if (shareButton) {
  shareButton.addEventListener("click", shareResult);
}

// ==================== Función para Compartir Resultado ==================== 
function shareResult() {
  if (!gameOver) {
    showMessage("Termina el juego para compartir el resultado.");
    return;
  }
  let shareText = isDailyMode
    ? `Mundole del día ${new Date().toDateString()}:\n`
    : "Mundole modo normal:\n";
  historialIntentos.forEach((attempt, index) => {
    shareText += `${index + 1}: ${attempt.distancia} km ${attempt.direccion}\n`;
  });
  shareText += "\nhttps://gamesle.netlify.app/";
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    const whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(shareText);
    window.open(whatsappUrl, "_blank");
  } else if (navigator.share) {
    navigator.share({
      title: "Mundole - Resultado",
      text: shareText,
      url: "https://gamesle.netlify.app/"
    })
    .then(() => console.log("Compartido exitosamente"))
    .catch(error => console.log("Error al compartir", error));
  } else {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        showMessage("¡Resultado copiado al portapapeles!");
      })
      .catch(() => {
        showMessage("Error al copiar el resultado.");
      });
  }
}

// ==================== Inicialización ==================== 
document.addEventListener("DOMContentLoaded", function () {
  // Configurar el modo diario según lo guardado en localStorage
  const storedMode = localStorage.getItem("isDailyModeMundole");
  if (storedMode === "true") {
    isDailyMode = true;
    const modoJuegoEl = document.getElementById("modo-juego");
    if (modoJuegoEl) modoJuegoEl.textContent = "Modo Diario";
  }
  
  cargarHistorialPartidas();
  iniciarJuego();
});
